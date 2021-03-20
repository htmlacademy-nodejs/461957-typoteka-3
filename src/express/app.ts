import {ClientRoutes, DEFAULT_SSR_PORT, STATIC_DIR} from "../constants-es6";
import {
  adminPublicationsRouter,
  articlesRouter,
  categoriesRouter,
  commentsRouter,
  mainPageRouter,
  registrationRouter,
  searchRouter,
  signInRouter,
} from "./routes";
import express from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import * as path from "path";
import {ENV} from "../shared/env/env";
import {notFoundMiddleware} from "./middlewares/not-found.middleware";
import {errorHandlerMiddleware} from "./middlewares/error-handler.middleware";

export function runApp(): void {
  const port = ENV.SSR_PORT || DEFAULT_SSR_PORT;
  const app = express();
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, STATIC_DIR)));

  app.use(ClientRoutes.INDEX, mainPageRouter);
  app.use(ClientRoutes.SIGN_IN, signInRouter);
  app.use(ClientRoutes.SEARCH.INDEX, searchRouter);
  app.use(ClientRoutes.ADMIN.INDEX, adminPublicationsRouter);
  app.use(ClientRoutes.CATEGORIES, categoriesRouter);
  app.use(ClientRoutes.ARTICLES.INDEX, articlesRouter);
  app.use(ClientRoutes.REGISTRATION, registrationRouter);
  app.use(ClientRoutes.COMMENTS, commentsRouter);
  app.use(`*`, notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
}
