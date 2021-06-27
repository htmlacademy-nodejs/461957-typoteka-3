import * as path from "path";

import chalk from "chalk";
import cookieParser from "cookie-parser";
import express, {Express} from "express";

import {DEFAULT_SSR_PORT, STATIC_DIR} from "../constants";
import {ClientRoute} from "../shared/constants/routes/client-route";
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
  app.use(ClientRoute.INDEX, mainPageRouter);
  app.use(ClientRoute.SIGN_IN, signInRouter);
  app.use(ClientRoute.SEARCH.INDEX, searchRouter);
  app.use(ClientRoute.ADMIN.INDEX, adminPublicationsRouter);
  app.use(ClientRoute.CATEGORIES, categoriesRouter);
  app.use(ClientRoute.ARTICLES.INDEX, articlesRouter);
  app.use(ClientRoute.REGISTRATION, registrationRouter);
  app.use(ClientRoute.COMMENTS, commentsRouter);
  app.use(ClientRoute.SIGN_OUT, signOutRouter);
  app.use(`*`, notFoundMiddleware);
}
