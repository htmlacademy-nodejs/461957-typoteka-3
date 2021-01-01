import {defineArticle, defineCategory, defineComment} from "./models";
import {databaseConnector} from "./connectors/database.connector";
import {ExitCode} from "../../../constants-es6";
import {getLogger} from "../../logger";
import {ArticleProperty, CommentProperty} from "./constants/property-name";

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

    ArticleModel.hasMany(CommentModel, {as: ArticleProperty.COMMENTS, foreignKey: CommentProperty.ARTICLEID});
    CommentModel.belongsTo(ArticleModel, {foreignKey: CommentProperty.ARTICLEID});

    await connection.sync({force: true});
  } catch (e) {
    logger.error(`Failed to Create categories,\n${(e as Error).toString()}`);
    process.exit(ExitCode.ERROR);
  }
}

void connectToDatabase();
