import {Application} from "express";
import http from "http";

import {ApiService} from "../../api-service";
import {connectToDatabaseInMemory} from "../../data-access/database-connector";
import {fillDb} from "../../data-access/fill-db";
import {defineDatabaseModels} from "../../data-access/models";

const MOCK_ARTICLES_COUNT = 10;

export async function initApp(): Promise<{server: Application; httpServer: http.Server}> {
  const connection = await connectToDatabaseInMemory();
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
