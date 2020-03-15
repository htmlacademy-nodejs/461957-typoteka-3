const {SSR_PORT} = require(`../constants`);
const chalk = require(`chalk`);

const express = require(`express`);
const mainPageRouter = require(`./routes/main-page`);
const registerRouter = require(`./routes/register`);
const loginRouter = require(`./routes/login`);
const searchRouter = require(`./routes/search`);
const myRouter = require(`./routes/my`);
const categoriesRouter = require(`./routes/categories`);

const app = express();

app.use(`/`, mainPageRouter);
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/search`, searchRouter);
app.use(`/my`, myRouter);
app.use(`/categories`, categoriesRouter);
// app.use(`/500`, error500Router);
// app.use(`/sign-up`, signUpRouter);
// app.use(`*`, error404Router);


app.listen(SSR_PORT, () =>
  console.info(chalk.green(`Listen on port ${SSR_PORT}`)),
);
