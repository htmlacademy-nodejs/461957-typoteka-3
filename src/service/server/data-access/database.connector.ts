import {Sequelize} from "sequelize";
import {ENV} from "../../../shared/env/env";

export class DatabaseConnector {
  private connection: Sequelize;

  public open(): Sequelize {
    if (!this.connection) {
      this.connection = openConnection();
    }
    return this.connection;
  }

  public async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = undefined;
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
  });
}

export const databaseConnector = new DatabaseConnector();
