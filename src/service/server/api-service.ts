import * as http from "http";
import path from "path";

import * as bodyParser from "body-parser";
import express, {Application, RequestHandler, Response} from "express";
import {Sequelize} from "sequelize";

import {DEFAULT_PORT, HttpCode, IMAGES_DIR} from "../../constants";
import {APIRoute} from "../../shared/constants/routes/api-route";
import {getLogger} from "../logger";
import {messageConstructor} from "../logger/message-constructor";
import {assignLogFieldsMiddleware, logRouteMiddleware, responseStatusCodeMiddleware} from "../middlewares/logger";
import {RequestExtended} from "../models/types/request-extended";

import {defineDatabaseModels} from "./data-access/models";
import {DatabaseModels} from "./data-access/models/define-models";
import {apiRouter} from "./routes";

class ApiService {
  private readonly logger = getLogger();

  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware([
      bodyParser.json({limit: `50mb`}),
      assignLogFieldsMiddleware,
      responseStatusCodeMiddleware,
      logRouteMiddleware,
    ]);
  }

  public init(connection: Sequelize): void {
    const {CategoryModel, ArticleModel, CommentModel, UserModel, RoleModel, RefreshTokenModel} = defineDatabaseModels(
      connection,
    );
    this.configureRoutes({ArticleModel, CategoryModel, CommentModel, UserModel, RoleModel, RefreshTokenModel});
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

  private configureRoutes({
    CategoryModel,
    ArticleModel,
    CommentModel,
    UserModel,
    RefreshTokenModel,
  }: DatabaseModels): void {
    this.app.use(APIRoute.STATIC, express.static(path.join(__dirname, IMAGES_DIR)));
    this.app.use(APIRoute.API, apiRouter({CategoryModel, ArticleModel, CommentModel, UserModel, RefreshTokenModel}));
    this.app.use((req: RequestExtended, res: Response) => {
      res.status(HttpCode.NOT_FOUND).send(`Page not found`);
      this.logger.error(messageConstructor(req.context.id, `'${req.url}' not found`));
    });
  }
}

export {ApiService};
