import {categoryFabric} from "./models";
import {databaseConnector} from "./connectors/database.connector";
import {ExitCode} from "../../../constants-es6";
import {getLogger} from "../../logger";

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
    const Category = categoryFabric(connection);
    await Category.create({label: `www`});
    await connection.sync({force: true});
  } catch (e) {
    logger.error(`Failed to Create categories,\n${(e as Error).toString()}`);
    process.exit(ExitCode.ERROR);
  }
}

void connectToDatabase();
