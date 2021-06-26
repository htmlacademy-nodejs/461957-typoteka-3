import {hashSync} from "bcrypt";

import {MockTextsFilePath} from "../../../constants-es6";
import {RoleId} from "../../../shared/constants/role-id";
import {CategoryId} from "../../../types/category-id";
import {IRole} from "../../../types/interfaces/role";
import {IUserCreating} from "../../../types/interfaces/user-creating";
import {UserId} from "../../../types/user-id";
import {readTXTFile} from "../../cli/generate-database-mock/fs-functions/read-txt-file";
import {
  getAnnounce,
  getCategoriesLabels,
  getComments,
  getDate,
  getFullText,
  getRandomItem,
  getTitle,
} from "../../cli/generate-database-mock/values-generators";

import {TableName} from "./constants/table-name";
import {IArticleEntity, IArticleModel} from "./models/article";
import {ICategoryEntity, ICategoryModel} from "./models/category";
import {ICommentModel} from "./models/comment";
import {IRoleEntity, IRoleModel} from "./models/role";
import {IUserEntity, IUserModel} from "./models/user";

const SALT_ROUNDS = 10;

export async function fillDb(
  articlesNumber: number,
  models: {
    CommentModel: ICommentModel;
    CategoryModel: ICategoryModel;
    ArticleModel: IArticleModel;
    UserModel: IUserModel;
    RoleModel: IRoleModel;
  },
): Promise<void> {
  const {CommentModel, CategoryModel, ArticleModel, UserModel, RoleModel} = models;
  const [
    firstNames,
    lastNames,
    emails,
    permissions,
    categories,
    sentences,
    comments,
    titles,
    avatars,
  ] = await loadSources([
    MockTextsFilePath.FIRST_NAMES,
    MockTextsFilePath.LAST_NAMES,
    MockTextsFilePath.EMAILS,
    MockTextsFilePath.PERMISSIONS,
    MockTextsFilePath.CATEGORIES,
    MockTextsFilePath.SENTENCES,
    MockTextsFilePath.COMMENTS,
    MockTextsFilePath.TITLES,
    MockTextsFilePath.AVATARS,
  ]);

  const createdCategories = await createCategories(CategoryModel, categories);
  const roles = await createRoles(RoleModel);
  const users = await createUsers(UserModel, {firstNames, lastNames, emails, avatars});
  const createdArticles = await createArticles(ArticleModel, articlesNumber, users, {
    titles,
    comments,
    sentences,
  });
  await assignCategoriesToArticles(createdArticles, createdCategories, {categories});
}

function createCategories(CategoryModel: ICategoryModel, categories: string[]): Promise<ICategoryEntity[]> {
  return CategoryModel.bulkCreate(categories.map(item => ({label: item})));
}

async function assignCategoriesToArticles(
  articlesEntities: IArticleEntity[],
  categoriesEntities: ICategoryEntity[],
  payload: {categories: string[]},
): Promise<void> {
  const categoryIdByName = getCategoriesIds(categoriesEntities);
  for (const article of articlesEntities) {
    await article.setCategories(
      getCategoriesLabels(payload.categories).map(categoryName => categoryIdByName[categoryName]),
    );
  }
}

async function createArticles(
  ArticleModel: IArticleModel,
  articlesCount: number,
  users: IUserEntity[],
  payload: {titles: string[]; sentences: string[]; comments: string[]},
): Promise<IArticleEntity[]> {
  const articles = new Array(articlesCount).fill(undefined);
  const authors = selectAuthorsOnly(users);
  const commentatorsIds = users.map(item => ({authorId: item.getDataValue(`id`)}));
  return ArticleModel.bulkCreate(
    articles.map(() => ({
      title: getTitle(payload.titles),
      fullText: getFullText(payload.sentences),
      createdDate: getDate(Date.now()),
      announce: getAnnounce(payload.sentences),
      categories: undefined,
      comments: getComments(payload.comments, commentatorsIds),
      authorId: getAuthorId(authors),
    })),
    {include: [TableName.COMMENTS]},
  );
}

async function loadSources(filePaths: string[]): Promise<string[][]> {
  return Promise.all(filePaths.map(readTXTFile));
}

function getCategoriesIds(categoriesEntities: ICategoryEntity[]): Record<string, CategoryId> {
  return categoriesEntities.reduce(
    (acc, next) => ({
      [next.getDataValue(`label`)]: next.getDataValue(`id`),
      ...acc,
    }),
    {} as Record<string, CategoryId>,
  );
}

async function createUsers(
  UserModel: IUserModel,
  payload: {firstNames: string[]; lastNames: string[]; emails: string[]; avatars: string[]},
): Promise<IUserEntity[]> {
  const admin: Pick<IUserCreating, `email` | `roleId`> = {
    email: `admin-email@gmail.com`,
    roleId: RoleId.ADMIN,
  };
  const authors = new Array(10).fill(undefined).map<Pick<IUserCreating, `email` | `roleId`>>(() => ({
    email: getRandomItem(payload.emails),
    roleId: RoleId.AUTHOR,
  }));
  const readers = new Array(10).fill(undefined).map<Pick<IUserCreating, `email` | `roleId`>>(() => ({
    email: getRandomItem(payload.emails),
    roleId: RoleId.READER,
  }));
  return UserModel.bulkCreate(
    filterUniqEmails(
      [admin, ...authors, ...readers].map<IUserCreating>(item => ({
        ...item,
        firstName: getRandomItem(payload.firstNames),
        lastName: getRandomItem(payload.lastNames),
        avatar: getRandomItem(payload.avatars),
        password: hashSync(item.email, SALT_ROUNDS),
      })),
    ),
  );
}

async function createRoles(RoleModel: IRoleModel): Promise<IRoleEntity[]> {
  const roles: [IRole, IRole, IRole] = [
    {
      id: RoleId.ADMIN,
      title: `ADMIN`,
    },
    {
      id: RoleId.AUTHOR,
      title: `AUTHOR`,
    },
    {
      id: RoleId.READER,
      title: `READER`,
    },
  ];
  return RoleModel.bulkCreate(roles);
}

function filterUniqEmails<T extends {email: string}>(items: T[]): T[] {
  const uniqueEmails = new Set();
  return items.reduce((accumulator, item) => {
    if (!uniqueEmails.has(item.email)) {
      uniqueEmails.add(item.email);
      accumulator.push(item);
    }
    return accumulator;
  }, [] as T[]);
}

function selectAuthorsOnly(users: IUserEntity[]): IUserEntity[] {
  return users.filter(
    user => user.getDataValue(`roleId`) === RoleId.AUTHOR || user.getDataValue(`roleId`) === RoleId.ADMIN,
  );
}

function getAuthorId(users: IUserEntity[]): UserId {
  return getRandomItem(users).getDataValue(`id`);
}
