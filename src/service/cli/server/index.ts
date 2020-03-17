import {Express} from "express";

const express = require(`express`);
const chalk = require(`chalk`);
const postsRouter = require(`./routes/posts`);
const {DEFAULT_PORT} = require(`../../../constants`);

function runServer(args?: [string]) {
  const [customPort] = args;
  const port = parseInt(customPort, 10) || DEFAULT_PORT;
  const app: Express = express();

  app.use(`/posts`, postsRouter);

  app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
}

export = runServer;
