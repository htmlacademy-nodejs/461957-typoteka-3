import {CliAction} from "../../types/cli-action";
import {ExitCode, MockTextsFilePath} from "../../constants-es6";
import {Model, ModelCtor, Sequelize} from "sequelize";
import {connectToDatabase} from "../server/data-access/database-connector";
import {defineDatabaseModels} from "../server/data-access/models";
import {ICategoryModel} from "../server/data-access/models/category";
import {getLogger} from "../logger";
import {readTXTFile} from "./generate-database-mock/fs-functions/read-txt-file";
import chalk from "chalk";

interface Models<U, I, O, P> {
  CategoryModel: ICategoryModel;
  ArticleModel: ModelCtor<Model<U, I>>;
  CommentModel: ModelCtor<Model<O, P>>;
}

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
      logger.error(e);
      process.exit(ExitCode.ERROR);
    }
    try {
      const {CategoryModel, ArticleModel, CommentModel} = defineDatabaseModels(connection);
      await connection.sync({force: true});

      await init(mockCount, {ArticleModel, CategoryModel, CommentModel});
      await connection.close();
    } catch (err) {
      process.exit(1);
    }
    logger.info(`Connection to database established`);
  },
};

async function init<U, I, O, P>(articlesNumber: number, models: Models<U, I, O, P>): Promise<void> {
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

  await createCategories(CategoryModel, categories);
}

async function createCategories(CategoryModel: ICategoryModel, categories: string[]): Promise<void> {
  const categoryModels = await CategoryModel.bulkCreate(categories.map(item => ({label: item})));
}

async function loadSources(filePaths: string[]): Promise<string[][]> {
  return Promise.all(filePaths.map(readTXTFile));
}
