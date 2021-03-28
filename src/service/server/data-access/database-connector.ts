import {getLogger} from "../../logger";
import {databaseConnector} from "./connectors/database.connector";
import {Sequelize} from "sequelize";
import {ExitCode} from "../../../constants-es6";

export async function connectToDatabase(): Promise<Sequelize> {
  const logger = getLogger();
  try {
    const connection = databaseConnector.open();
    logger.info(`Establishing a database connection`);
    await connection.authenticate();
    logger.info(`Connection to the database is established`);
    return connection;
  } catch (e) {
    logger.error(`Failed to establish a database connection,\n${(e as Error).toString()}`);
    process.exit(ExitCode.ERROR);
    throw e;
  }
}

// eslint-disable-next-line consistent-return
export async function connectToDatabaseInMemory(): Promise<Sequelize> {
  try {
    const connection = new Sequelize(`sqlite::memory:`, {logging: false});
    console.log(`Establishing a database connection`);
    await connection.authenticate();
    console.log(`Connection to the database is established`);
    return connection;
  } catch (e) {
    console.error(`Failed to establish a database connection,\n${(e as Error).toString()}`);
    process.exit(ExitCode.ERROR);
    throw e;
  }
}
