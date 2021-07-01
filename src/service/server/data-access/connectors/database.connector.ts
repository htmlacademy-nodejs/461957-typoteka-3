import {Sequelize} from "sequelize";

import {ENV} from "../../../../shared/env/env";
import {getLogger} from "../../../logger";

const logger = getLogger();

class DatabaseConnector {
  private connection: Sequelize;

  public open(): Sequelize {
    if (!this.connection) {
      this.connection = openConnection();
    }
    return this.connection;
  }

  public async close(): Promise<void> {
    // TODO: run this method
    if (this.connection) {
      await this.connection.close();
      this.connection = undefined;
      logger.info(`The database connection is closed`);
    } else {
      logger.info(`No open connections`);
    }
  }
}

function openConnection(): Sequelize {
  return new Sequelize({
    database: ENV.DATABASE,
    username: ENV.DATABASE_USER,
    password: ENV.DATABASE_PASSWORD,
    host: ENV.DATABASE_HOST,
    dialect: `postgres`,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    logging: logger.debug.bind(logger),
  });
}

const databaseConnector = new DatabaseConnector();

export {
  DatabaseConnector,
  databaseConnector,
};
