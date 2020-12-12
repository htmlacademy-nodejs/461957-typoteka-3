import {App} from "./app";
import {connectToDatabase} from "./data-access/database-connector";

export async function runServer(): Promise<void> {
  const app = new App();
  await connectToDatabase();
  app.listen();
}
