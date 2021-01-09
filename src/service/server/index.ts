import {App} from "./app";
import {connectToDatabase} from "./data-access/database-connector";
import {ExitCode} from "../../constants-es6";

export async function runServer(): Promise<void> {
  const app = new App();
  try {
    const connection = await connectToDatabase();
  } catch (e) {
    process.exit(ExitCode.ERROR);
  }

  app.listen();
}
