import {App} from "./app";
import {ExitCode} from "../../constants-es6";

export async function runServer(): Promise<void> {
  const app = new App();
  try {
    await app.init();
  } catch (e) {
    process.exit(ExitCode.ERROR);
  }

  app.listen();
}
