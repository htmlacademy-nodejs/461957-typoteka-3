import {Sequelize} from "sequelize";

import {getLogger} from "../../../logger";

import {databaseConnector} from "./database.connector";

async function connectToDatabase(): Promise<Sequelize> {
  const logger = getLogger();
  const connection = databaseConnector.open();
  logger.info(`Establishing a database connection`);
  await connection.authenticate();
  logger.info(`Connection to the database is established`);
  return connection;
}

export {connectToDatabase};
