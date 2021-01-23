import {Application} from "express";
import http from "http";
import {ApiService} from "../../api-service";
import {connectToDatabase} from "../../data-access/database-connector";

export async function initApp(): Promise<{server: Application; httpServer: http.Server}> {
  const apiService = new ApiService();
  const connection = await connectToDatabase();
  apiService.init(connection);
  return {
    httpServer: apiService.listen(),
    server: apiService.getServer(),
  };
}
