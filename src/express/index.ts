import {DEFAULT_SSR_PORT, STATIC_DIR} from "../constants-es6";
import {mainPageRouter} from "./routes/main-page";
import express from "express";
import chalk from "chalk";
import * as path from "path";
import {ENV} from "../shared/env/env";
import {adminPublicationsRouter} from "./routes/admin-publications.router";
import {articlesRouter} from "./routes/articles.router";
import {streamPage} from "./utils/stream-page";
import {ErrorPage500} from "./views/pages/ErrorPage500";
import {ErrorPage404} from "./views/pages/ErrorPage404";
import {SSRError} from "./errors/ssr-error";

// const registerRouter = require(`./routes/register`);
// const loginRouter = require(`./routes/login`);
// const searchRouter = require(`./routes/search`);
// const categoriesRouter = require(`./routes/categories`);
// const articlesRouter = require(`./routes/articles`);
const port = ENV.SSR_PORT || DEFAULT_SSR_PORT;
const app = express();
app.use(express.static(path.join(__dirname, STATIC_DIR)));

app.use(`/`, mainPageRouter);
// app.use(`/register`, registerRouter);
// app.use(`/login`, loginRouter);
// app.use(`/search`, searchRouter);
app.use(`/my`, adminPublicationsRouter);
// app.use(`/categories`, categoriesRouter);
app.use(`/articles`, articlesRouter);
app.use(`/500`, (req, res) => streamPage(res, ErrorPage500));
app.get(`/forbidden`, (req, res, next) => next(new SSRError({message: `${req.ip} tried to access /Forbidden`})));
app.get(`*`, (req, res, next) =>
  next(new SSRError({message: `${req.ip} tried to reach ${req.originalUrl}`, statusCode: 404, shouldRedirect: true})),
);

app.use((err: SSRError, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  if (err.shouldRedirect) {
    streamPage(res, ErrorPage404);
  } else {
    streamPage(res, ErrorPage500);
  }
});

app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
