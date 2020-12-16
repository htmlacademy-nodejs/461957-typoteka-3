import {ClientRoutes, DEFAULT_SSR_PORT, STATIC_DIR} from "../constants-es6";
import {mainPageRouter} from "./routes/main-page";
import express from "express";
import chalk from "chalk";
import * as path from "path";
import {ENV} from "../shared/env/env";
import {adminPublicationsRouter} from "./routes/admin-publications.router";
import {articlesRouter} from "./routes/articles.router";
import {notFoundMiddleware} from "./middlewares/not-found.middleware";
import {errorHandlerMiddleware} from "./middlewares/error-handler.middleware";
import {searchRouter} from "./routes/search.router";
import {registrationRouter} from "./routes/registration.router";
import {signInRouter} from "./routes/sign-in.router";
import {categoriesRouter} from "./routes/categories.router";

const port = ENV.SSR_PORT || DEFAULT_SSR_PORT;
const app = express();
app.use(express.static(path.join(__dirname, STATIC_DIR)));

app.use(`/`, mainPageRouter);
app.use(ClientRoutes.SIGN_IN, signInRouter);
app.use(ClientRoutes.SEARCH.INDEX, searchRouter);
app.use(ClientRoutes.ADMIN.INDEX, adminPublicationsRouter);
app.use(ClientRoutes.CATEGORIES, categoriesRouter);
app.use(ClientRoutes.ARTICLES.INDEX, articlesRouter);
app.use(ClientRoutes.REGISTRATION, registrationRouter);
app.use(`*`, notFoundMiddleware);

app.use(errorHandlerMiddleware);

app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
