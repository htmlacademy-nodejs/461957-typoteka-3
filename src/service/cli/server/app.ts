import express, {Application} from "express";
import * as bodyParser from "body-parser";
import {DEFAULT_PORT} from "../../../constants-es6";
import {apiRouter} from "./routes/api";
import * as http from "http";

export class App {
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
    return this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  private initializeMiddleware(): void {
    this.app.use(bodyParser.json());
    // TODO: Error handling
  }

  private configureRoutes(): void {
    this.app.use(`/api`, apiRouter);
    this.app.use((req, res) => {
      res.status(404).send(`Page not found`);
    });
  }
}
