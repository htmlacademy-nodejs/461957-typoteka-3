import {App} from "./app";

export function runServer(): void {
  const app = new App();
  app.listen();
}
