import {NextFunction, Request, Response} from "express";
import {getLogger} from "../logger";

export function responseStatusCodeMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.on(`finish`, () => {
    const logger = getLogger();
    logger.info(`Response sent, code: ${res.statusCode}`);
  });
  next();
}
