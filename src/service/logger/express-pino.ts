import pino from "express-pino-logger";
import {getLogger} from "./manual-logger";

export const expressPino = pino({logger: getLogger()});
