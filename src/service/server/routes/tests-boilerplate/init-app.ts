import {Application} from "express";
import http from "http";
import {App} from "../../app";
import {connectToDatabase} from "../../data-access/database-connector";

export async function initApp(): Promise<{server: Application; httpServer: http.Server}> {
  const app = new App();
  const connection = await connectToDatabase();
  app.init(connection);
  return {
    httpServer: app.listen(),
    server: app.getServer(),
  };
}
