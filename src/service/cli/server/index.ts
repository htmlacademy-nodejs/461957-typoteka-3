import {App} from "./app";

function runServer() {
  const app = new App();
  app.listen();
}

export = runServer;
