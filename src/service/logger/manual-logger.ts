import pino, {Bindings} from "pino";
import {Logger} from "pino";
import {ENV} from "../../shared/env/env";

const logger = pino({
  name: `logger`,
  level: ENV.LOG_LEVEL ?? `error`,
});

export function getLogger(options: Bindings = {}): Logger {
  return logger.child(options);
}
