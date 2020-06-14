import express from "express";
import {DEFAULT_PORT} from "../../../constants-es6";


const chalk = require(`chalk`);
const postsRouter = require(`./routes/posts`);

function runServer(args?: [string]) {
  const [customPort] = args;
  const port = parseInt(customPort, 10) || DEFAULT_PORT;
  const app: express.Application = express();

  app.use(`/posts`, postsRouter);

  app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
}

export = runServer;
