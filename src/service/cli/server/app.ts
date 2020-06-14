import express from "express";
import {Application} from "express";
import * as bodyParser from "body-parser";
import {DEFAULT_PORT} from "../../../constants-es6";
import {apiRouter} from "./routes/api";
import postsRouter from "./routes/posts";

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

  public listen(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const port = process.env.PORT || DEFAULT_PORT;
      this.app.listen(port, () => {
        console.log(`App listening on the port ${port}`);
        resolve();
      });
    });
  }

  private initializeMiddleware(): void {
    this.app.use(bodyParser.json());
    // TODO: Error handling
  }

  private configureRoutes(): void {
    this.app.use(`/posts`, postsRouter);
    this.app.use(`/api`, apiRouter);
    this.app.use((req, res) => {
      res.status(404).send(`Page not found`);
    });
  }
}
