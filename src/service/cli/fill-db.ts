import {CliAction} from "../../types/cli-action";
import {ExitCode, MockTextsFilePath} from "../../constants-es6";
import {Sequelize} from "sequelize";
import {connectToDatabase} from "../server/data-access/database-connector";
import {defineDatabaseModels} from "../server/data-access/models";
import {ICategoryEntity, ICategoryModel} from "../server/data-access/models/category";
import {getLogger} from "../logger";
import {readTXTFile} from "./generate-database-mock/fs-functions/read-txt-file";
import chalk from "chalk";
import {IArticleModel} from "../server/data-access/models/article";
import {DatabaseModels} from "../server/data-access/models/define-models";
import {getAnnounce, getComments, getDate, getFullText, getTitle} from "./generate-database-mock/values-generators";
import {TableName} from "../server/data-access/constants/table-name";

const DEFAULT_COUNT = 3;
const logger = getLogger();

export const cliAction: CliAction = {
  name: `--fill-db`,
  async run(args?: string): Promise<void> {
    const [mockCountInput] = args;
    const mockCount = parseInt(mockCountInput, 10) || DEFAULT_COUNT;
    if (mockCount > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций, введенное значение: ${mockCount}`));
      process.exit(ExitCode.SUCCESS);
    }
    let connection: Sequelize;
    try {
      connection = await connectToDatabase();
    } catch (e) {
      logger.error((e as Error).message);
      process.exit(ExitCode.ERROR);
    }
    try {
      const {CategoryModel, ArticleModel, CommentModel} = defineDatabaseModels(connection);
      await connection.sync({force: true});

      await init(mockCount, {ArticleModel, CategoryModel, CommentModel});
      await connection.close();
    } catch (e) {
      logger.error((e as Error).message);
      process.exit(1);
    }
    logger.info(`Connection to database established`);
  },
};

async function init(articlesNumber: number, models: Partial<DatabaseModels>): Promise<void> {
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
}

function createCategories(CategoryModel: ICategoryModel, categories: string[]): Promise<ICategoryEntity[]> {
  return CategoryModel.bulkCreate(categories.map(item => ({label: item})));
}

async function createArticles(
  ArticleModel: IArticleModel,
  articlesCount: number,
  payload: {titles: string[]; sentences: string[]; comments: string[]},
): Promise<void> {
  const articles = new Array(articlesCount).fill(undefined);
  await ArticleModel.bulkCreate(
    articles.map(() => ({
      title: getTitle(payload.titles),
      fullText: getFullText(payload.sentences),
      createdDate: getDate(Date.now()),
      announce: getAnnounce(payload.sentences),
      category: [1, 2],
      comments: getComments(payload.comments),
    })),
    {include: [TableName.COMMENTS]},
  );
}

async function loadSources(filePaths: string[]): Promise<string[][]> {
  return Promise.all(filePaths.map(readTXTFile));
}
