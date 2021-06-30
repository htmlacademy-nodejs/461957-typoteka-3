import {NextFunction, Response} from "express";

import {getLogger, messageConstructor} from "../../logger";
import {IRequestExtended} from "../../models/interfaces/request-extended";

function responseStatusCodeMiddleware(req: IRequestExtended, res: Response, next: NextFunction): void {
  res.on(`finish`, () => onResFinished(req, res));
  next();
}

function onResFinished(req: IRequestExtended, res: Response): void {
  res.removeListener(`finish`, onResFinished);
  getLogger().info(messageConstructor(req.context.id, `Response sent, code: ${res.statusCode}`));
}

export {
  responseStatusCodeMiddleware,
};
