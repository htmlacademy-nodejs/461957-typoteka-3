import logger from "pino-http";
import {getLogger} from "./manual-logger";

export const pinoHttp = logger({logger: getLogger(), useLevel: `debug`});
