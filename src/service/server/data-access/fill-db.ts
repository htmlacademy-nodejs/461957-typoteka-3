import {MockTextsFilePath} from "../../../constants-es6";
import {ICategoryEntity, ICategoryModel} from "./models/category";
import {IArticleEntity, IArticleModel} from "./models/article";
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
import {readTXTFile} from "../../cli/generate-database-mock/fs-functions/read-txt-file";
import {CategoryId} from "../../../types/category-id";
import {ICommentModel} from "./models/comment";
import {IUserEntity, IUserModel} from "./models/user";
import {IUserCreating} from "../../../types/interfaces/user-creating";
import {IRoleEntity, IRoleModel} from "./models/role";
import {IRole} from "../../../types/interfaces/role";
import {hashSync} from "bcrypt";
import {RoleId} from "../../../shared/constants/role-id";

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
  const [firstNames, lastNames, emails, permissions, categories, sentences, comments, titles] = await loadSources([
    MockTextsFilePath.FIRST_NAMES,
    MockTextsFilePath.LAST_NAMES,
    MockTextsFilePath.EMAILS,
    MockTextsFilePath.PERMISSIONS,
    MockTextsFilePath.CATEGORIES,
    MockTextsFilePath.SENTENCES,
    MockTextsFilePath.COMMENTS,
    MockTextsFilePath.TITLES,
  ]);

  const createdCategories = await createCategories(CategoryModel, categories);
  const createdArticles = await createArticles(ArticleModel, articlesNumber, {titles, comments, sentences});
  const roles = await createRoles(RoleModel);
  const createdUsers = await createUsers(UserModel, {firstNames, lastNames, emails});
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
  payload: {titles: string[]; sentences: string[]; comments: string[]},
): Promise<IArticleEntity[]> {
  const articles = new Array(articlesCount).fill(undefined);
  return ArticleModel.bulkCreate(
    articles.map(() => ({
      title: getTitle(payload.titles),
      fullText: getFullText(payload.sentences),
      createdDate: getDate(Date.now()),
      announce: getAnnounce(payload.sentences),
      categories: undefined,
      comments: getComments(payload.comments),
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
  payload: {firstNames: string[]; lastNames: string[]; emails: string[]},
): Promise<IUserEntity[]> {
  const admin: IUserCreating = {
    avatar: ``,
    email: `admin-email@gmail.com`,
    firstName: getRandomItem(payload.firstNames),
    lastName: getRandomItem(payload.lastNames),
    roleId: RoleId.ADMIN,
    password: hashSync(`admin-email@gmail.com`, SALT_ROUNDS),
  };
  const authors = new Array(10).fill(undefined).map<IUserCreating>(() => {
    const email = getRandomItem(payload.emails);
    return {
      avatar: ``,
      email,
      firstName: getRandomItem(payload.firstNames),
      lastName: getRandomItem(payload.lastNames),
      roleId: RoleId.AUTHOR,
      password: hashSync(email, SALT_ROUNDS),
    };
  });
  const readers = new Array(10).fill(undefined).map<IUserCreating>(() => {
    const email = getRandomItem(payload.emails);
    return {
      avatar: ``,
      email,
      firstName: getRandomItem(payload.firstNames),
      lastName: getRandomItem(payload.lastNames),
      roleId: RoleId.READER,
      password: hashSync(email, SALT_ROUNDS),
    };
  });
  return UserModel.bulkCreate(filterUniqEmails([admin, ...authors, ...readers]));
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
