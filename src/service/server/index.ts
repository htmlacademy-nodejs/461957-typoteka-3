import {App} from "./app";
import {ExitCode} from "../../constants-es6";
import {connectToDatabase} from "./data-access/database-connector";

export async function runServer(): Promise<void> {
  const app = new App();
  try {
    const connection = await connectToDatabase();
    app.init(connection);
  } catch (e) {
    process.exit(ExitCode.ERROR);
  }

  app.listen();
}
