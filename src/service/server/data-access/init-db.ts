import {defineDatabaseModels} from "./models";
import {databaseConnector} from "./connectors/database.connector";
import {ExitCode} from "../../../constants-es6";
import {getLogger} from "../../logger";

export async function connectToDatabase(): Promise<void> {
  const logger = getLogger();
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
    const {CategoryModel, ArticleModel, CommentModel} = defineDatabaseModels(connection);
    await connection.sync({force: true});
  } catch (e) {
    logger.error(`Failed to Create categories,\n${(e as Error).toString()}`);
    process.exit(ExitCode.ERROR);
  }
}

void connectToDatabase();
