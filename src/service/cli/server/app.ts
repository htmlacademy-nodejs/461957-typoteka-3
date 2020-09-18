import express, {Application, Request, RequestHandler} from "express";
import * as bodyParser from "body-parser";
import {APIRoutes, DEFAULT_PORT, HttpCode} from "../../../constants-es6";
import {apiRouter} from "./routes/api";
import * as http from "http";
import {getLogger} from "../../logger";
import {assignLogFieldsMiddleware, logRouteMiddleware, responseStatusCodeMiddleware} from "../../middlewares/logger";

export class App {
  private logger = getLogger();

  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware([
      bodyParser.json(),
      assignLogFieldsMiddleware,
      responseStatusCodeMiddleware,
      logRouteMiddleware,
      // TODO: Error handling
    ]);
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

  private initializeMiddleware(middlewares: RequestHandler[]): void {
    middlewares.forEach(middleware => this.app.use(middleware));
  }

  private configureRoutes(): void {
    this.app.use(APIRoutes.API, apiRouter);
    this.app.use((req: Request, res) => {
      res.status(HttpCode.NOT_FOUND).send(`Page not found`);
      this.logger.error(`${req.url} not found`);
    });
  }
}
