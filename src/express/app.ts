import chalk from "chalk";
import cookieParser from "cookie-parser";
import express, {Express} from "express";
import * as path from "path";

import {ClientRoutes, DEFAULT_SSR_PORT, STATIC_DIR} from "../constants-es6";
import {ENV} from "../shared/env/env";

import {errorHandlerMiddleware, getUserFromCookiesMiddleware, notFoundMiddleware} from "./middlewares";
import {assignLogFieldsMiddleware, logRouteMiddleware, responseStatusCodeMiddleware} from "./middlewares/logger";
import {
  adminPublicationsRouter,
  articlesRouter,
  categoriesRouter,
  commentsRouter,
  mainPageRouter,
  registrationRouter,
  searchRouter,
  signInRouter,
  signOutRouter,
} from "./routes";

export function runApp(): void {
  const port = ENV.SSR_PORT || DEFAULT_SSR_PORT;
  const app = express();
  initializeMiddlewares(app);
  configureRoutes(app);
  app.use(errorHandlerMiddleware);

  app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
}

function initializeMiddlewares(app: Express): void {
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, STATIC_DIR)));
  app.use(assignLogFieldsMiddleware);
  app.use(responseStatusCodeMiddleware);
  app.use(logRouteMiddleware);
  app.use(getUserFromCookiesMiddleware);
}

function configureRoutes(app: Express): void {
  app.use(ClientRoutes.INDEX, mainPageRouter);
  app.use(ClientRoutes.SIGN_IN, signInRouter);
  app.use(ClientRoutes.SEARCH.INDEX, searchRouter);
  app.use(ClientRoutes.ADMIN.INDEX, adminPublicationsRouter);
  app.use(ClientRoutes.CATEGORIES, categoriesRouter);
  app.use(ClientRoutes.ARTICLES.INDEX, articlesRouter);
  app.use(ClientRoutes.REGISTRATION, registrationRouter);
  app.use(ClientRoutes.COMMENTS, commentsRouter);
  app.use(ClientRoutes.SIGN_OUT, signOutRouter);
  app.use(`*`, notFoundMiddleware);
}
