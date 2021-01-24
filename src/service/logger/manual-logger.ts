import pino, {Bindings} from "pino";
import {Logger} from "pino";
import {ENV} from "../../shared/env/env";
import {LogLevel} from "../../constants-es6";

const logger = pino({
  name: `logger`,
  level: ENV.LOG_LEVEL ?? LogLevel.ERROR,
});

export function getLogger(options: Bindings = {}): Logger {
  return logger.child(options);
}
