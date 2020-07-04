import {DEFAULT_SSR_PORT, STATIC_DIR} from "../constants-es6";
import {mainPageRouter} from "./routes/main-page";
import {createEngine} from "express-react-views";
import express from "express";
import chalk from "chalk";
import * as path from "path";
import {ENV} from "../shared/env/env";
import {adminPublicationsRouter} from "./routes/admin-publications.router";
import {articlesRouter} from "./routes/articles.router";

// const registerRouter = require(`./routes/register`);
// const loginRouter = require(`./routes/login`);
// const searchRouter = require(`./routes/search`);
// const categoriesRouter = require(`./routes/categories`);
// const articlesRouter = require(`./routes/articles`);
const templateExtension = ENV.NODE_ENV === `development` ? `tsx` : `js`;
const port = ENV.SSR_PORT || DEFAULT_SSR_PORT;
const app = express();
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, templateExtension);
app.engine(templateExtension, createEngine());
app.use(express.static(path.join(__dirname, STATIC_DIR)));

app.use(`/`, mainPageRouter);
// app.use(`/register`, registerRouter);
// app.use(`/login`, loginRouter);
// app.use(`/search`, searchRouter);
app.use(`/my`, adminPublicationsRouter);
// app.use(`/categories`, categoriesRouter);
app.use(`/articles`, articlesRouter);
// app.use(`/500`, error500Router);
// app.use(`*`, error404Router);

app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
