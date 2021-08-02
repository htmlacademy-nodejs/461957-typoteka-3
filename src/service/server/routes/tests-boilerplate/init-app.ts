import http from "http";

import {Application} from "express";

import {ApiService} from "../../api-service";
import {connectToDatabaseInMemory} from "../../data-access/connectors";
import {fillDb} from "../../data-access/fill-db";
import {defineDatabaseModels} from "../../data-access/models";
import {ExitCode} from "../../../../constants";

const MOCK_ARTICLES_COUNT = 10;

async function initApp(): Promise<{server: Application; httpServer: http.Server}> {
  const connection = await connectToDatabaseInMemory().catch(e => {
    console.error(`Failed to establish a database connection,\n${(e as Error).toString()}`);
    process.exit(ExitCode.ERROR);
  });
  const {CategoryModel, ArticleModel, CommentModel, UserModel, RoleModel} = defineDatabaseModels(connection);
  await connection.sync({force: true});
  await fillDb(MOCK_ARTICLES_COUNT, {ArticleModel, CategoryModel, CommentModel, UserModel, RoleModel});

  const apiService = new ApiService();
  apiService.init(connection);
  return {
    httpServer: apiService.listen(),
    server: apiService.getServer(),
  };
}

export {initApp};
