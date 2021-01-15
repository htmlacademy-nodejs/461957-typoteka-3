import express, {Application, RequestHandler, Response} from "express";
import * as bodyParser from "body-parser";
import {APIRoutes, DEFAULT_PORT, HttpCode} from "../../constants-es6";
import * as http from "http";
import {getLogger} from "../logger";
import {assignLogFieldsMiddleware, logRouteMiddleware, responseStatusCodeMiddleware} from "../middlewares/logger";
import {messageConstructor} from "../logger/message-constructor";
import {RequestExtended} from "../models/types/request-extended";
import {apiRouter} from "./routes";
import {defineDatabaseModels} from "./data-access/models";
import {connectToDatabase} from "./data-access/database-connector";
import {DatabaseModels} from "./data-access/models/define-models";

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
  }

  public async init(): Promise<void> {
    const connection = await connectToDatabase();
    const {CategoryModel, ArticleModel, CommentModel, ArticleCategoryModel} = defineDatabaseModels(connection);
    this.configureRoutes({CategoryModel, ArticleCategoryModel});
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

  private configureRoutes({CategoryModel, ArticleCategoryModel}: Partial<DatabaseModels>): void {
    this.app.use(APIRoutes.API, apiRouter({CategoryModel, ArticleCategoryModel}));
    this.app.use((req: RequestExtended, res: Response) => {
      res.status(HttpCode.NOT_FOUND).send(`Page not found`);
      this.logger.error(messageConstructor(req.context.id, `'${req.url}' not found`));
    });
  }

  private globalErrorHandler(err: Error, req: RequestExtended, res: Response): void {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this.logger.error(messageConstructor(req.context.id, `Error: ,` + err));
  }
}
