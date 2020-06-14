import express from "express";
import {DEFAULT_PORT} from "../../../constants-es6";
import bodyParser from "body-parser";
import {apiRouter} from "./routes/api";

const chalk = require(`chalk`);
const postsRouter = require(`./routes/posts`);

function runServer(args?: [string]) {
  const [customPort] = args;
  const port = parseInt(customPort, 10) || DEFAULT_PORT;
  const app: express.Application = express();

  app.use(bodyParser.json());
  app.use(`/posts`, postsRouter);
  app.use(`/api`, apiRouter);
  app.use((req, res) => {
    res.status(404).send(`Page not found`);
  });

  app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
}

export = runServer;
