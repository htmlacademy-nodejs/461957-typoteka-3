import {Sequelize} from "sequelize";

import {getLogger} from "../../../logger";

async function connectToDatabaseInMemory(): Promise<Sequelize> {
  const logger = getLogger();
  const connection = new Sequelize(`sqlite::memory:`, {logging: false});
  logger.info(`Establishing a database connection`);
  await connection.authenticate();
  logger.info(`Connection to the database is established`);
  return connection;
}

export {connectToDatabaseInMemory};
