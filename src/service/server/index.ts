import {ExitCode} from "../../constants";

import {ApiService} from "./api-service";
import {connectToDatabase} from "./data-access/database-connector";

export async function runServer(): Promise<void> {
  const apiService = new ApiService();
  try {
    const connection = await connectToDatabase();
    apiService.init(connection);
  } catch (e) {
    process.exit(ExitCode.ERROR);
  }

  apiService.listen();
}
