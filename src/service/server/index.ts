import {ExitCode} from "../../constants";
import {getLogger} from "../logger";

import {ApiService} from "./api-service";
import {connectToDatabase} from "./data-access/connectors";

async function runServer(): Promise<void> {
  const apiService = new ApiService();
  const logger = getLogger();
  try {
    const connection = await connectToDatabase().catch(e => {
      logger.error(`Failed to establish a database connection,\n${(e as Error).toString()}`);
      process.exit(ExitCode.ERROR);
    });
    apiService.init(connection);
  } catch (e) {
    process.exit(ExitCode.ERROR);
  }

  apiService.listen();
}

export {runServer};
