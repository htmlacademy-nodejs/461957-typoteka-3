import {MockTextsFilePath} from "../../../constants-es6";
import {ICategoryEntity, ICategoryModel} from "./models/category";
import {IArticleEntity, IArticleModel} from "./models/article";
import {
  getAnnounce,
  getCategoriesLabels,
  getComments,
  getDate,
  getFullText,
  getTitle,
} from "../../cli/generate-database-mock/values-generators";
import {TableName} from "./constants/table-name";
import {readTXTFile} from "../../cli/generate-database-mock/fs-functions/read-txt-file";
import {CategoryId} from "../../../types/category-id";
import {ICommentModel} from "./models/comment";

export async function fillDb(
  articlesNumber: number,
  models: {CommentModel: ICommentModel; CategoryModel: ICategoryModel; ArticleModel: IArticleModel},
): Promise<void> {
  const {CommentModel, CategoryModel, ArticleModel} = models;
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