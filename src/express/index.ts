import {DEFAULT_SSR_PORT, STATIC_DIR} from "../constants-es6";
// import {mainPageRouter} from "./routes/main-page";
import {createEngine} from "express-react-views";

const chalk = require(`chalk`);

const express = require(`express`);
// const registerRouter = require(`./routes/register`);
// const loginRouter = require(`./routes/login`);
// const searchRouter = require(`./routes/search`);
// const myRouter = require(`./routes/my`);
// const categoriesRouter = require(`./routes/categories`);
// const articlesRouter = require(`./routes/articles`);

const app = express();
// app.set(`views`, `src/express/templates/pages`);
// app.set(`view engine`, `pug`);
// app.use(express.static(STATIC_DIR));
app.set(`views`, __dirname + `/views`);
app.set(`view engine`, `jsx`);
app.engine(`jsx`, createEngine());
app.use(express.static(STATIC_DIR));

app.get(`/`, (req, res) => res.render(`index`, {name: `Name`}));

// app.use(`/`, mainPageRouter);
// app.use(`/register`, registerRouter);
// app.use(`/login`, loginRouter);
// app.use(`/search`, searchRouter);
// app.use(`/my`, myRouter);
// app.use(`/categories`, categoriesRouter);
// app.use(`/articles`, articlesRouter);
// app.use(`/500`, error500Router);
// app.use(`*`, error404Router);

app.listen(DEFAULT_SSR_PORT, () =>
  console.info(chalk.green(`Listen on port ${DEFAULT_SSR_PORT}`)),
);
