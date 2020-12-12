import {getLogger} from "../../logger";
import {ExitCode} from "../../../constants-es6";
import {databaseConnector} from "./database.connector";

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
}

void connectToDatabase();
