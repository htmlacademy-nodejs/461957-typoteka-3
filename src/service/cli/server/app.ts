import express, {Application, Request} from "express";
import * as bodyParser from "body-parser";
import {APIRoutes, DEFAULT_PORT, HttpCode} from "../../../constants-es6";
import {apiRouter} from "./routes/api";
import * as http from "http";
import {getLogger} from "../../logger";
import {responseStatusCodeMiddleware} from "../../middlewares/response-status-code.middleware";

export class App {
  private logger = getLogger();

  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.configureRoutes();
  }

  public getServer(): Application {
    return this.app;
  }

  public listen(): http.Server {
    const port = process.env.PORT || DEFAULT_PORT;
    return this.app
      .listen(port, () => {
        this.logger.info(`App listening on the port ${port}`);
      })
      .on(`error`, error => this.logger.error(`Unable to start the server on the port ${port}`, error));
  }

  private initializeMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(responseStatusCodeMiddleware);
    // TODO: Error handling
  }

  private configureRoutes(): void {
    this.app.use(APIRoutes.API, apiRouter);
    this.app.use((req: Request, res) => {
      res.status(HttpCode.NOT_FOUND).send(`Page not found`);
      this.logger.error(`${req.url} not found`);
    });
  }
}
