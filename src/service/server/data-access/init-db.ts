import {defineArticle, defineCategory, defineComment, defineIntermediateModel} from "./models";
import {databaseConnector} from "./connectors/database.connector";
import {ExitCode} from "../../../constants-es6";
import {getLogger} from "../../logger";
import {ArticleCategoryProperty, ArticleProperty, CommentProperty} from "./constants/property-name";
import {TableName} from "./constants/table-name";

const logger = getLogger();

export async function connectToDatabase(): Promise<void> {
  const connection = databaseConnector.open();
  try {
    logger.info(`Establishing a database connection`);
    await connection.authenticate();
    logger.info(`Connection to the database is established`);
  } catch (e) {
    logger.error(`Failed to establish a database connection,\n${(e as Error).toString()}`);
    process.exit(ExitCode.ERROR);
  }
  try {
    const CategoryModel = defineCategory(connection);
    const ArticleModel = defineArticle(connection);
    const CommentModel = defineComment(connection);
    const CategoryArticleIntermediateModel = defineIntermediateModel(connection, TableName.ARTICLES_CATEGORIES);

    ArticleModel.hasMany(CommentModel, {as: ArticleProperty.COMMENTS, foreignKey: CommentProperty.ARTICLEID});
    CommentModel.belongsTo(ArticleModel, {foreignKey: CommentProperty.ARTICLEID});

    ArticleModel.belongsToMany(CategoryModel, {
      through: CategoryArticleIntermediateModel,
      as: ArticleCategoryProperty.CATEGORY,
    });
    CategoryModel.belongsToMany(ArticleModel, {
      through: CategoryArticleIntermediateModel,
      as: ArticleCategoryProperty.ARTICLE,
    });

    await connection.sync({force: true});
  } catch (e) {
    logger.error(`Failed to Create categories,\n${(e as Error).toString()}`);
    process.exit(ExitCode.ERROR);
  }
}

void connectToDatabase();
