import {getLogger} from "../../logger";
import {databaseConnector} from "./connectors/database.connector";
import {Sequelize} from "sequelize";

export async function connectToDatabase(): Promise<Sequelize> {
  const logger = getLogger();
  const connection = databaseConnector.open();
  try {
    logger.info(`Establishing a database connection`);
    await connection.authenticate();
    logger.info(`Connection to the database is established`);
    return connection;
  } catch (e) {
    logger.error(`Failed to establish a database connection,\n${(e as Error).toString()}`);
    throw e;
  }
}
