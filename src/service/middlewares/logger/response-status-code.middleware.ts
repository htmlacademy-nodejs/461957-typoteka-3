import {NextFunction, Response} from "express";

import {getLogger} from "../../logger";
import {messageConstructor} from "../../logger/message-constructor";
import {RequestExtended} from "../../models/types/request-extended";

function responseStatusCodeMiddleware(req: RequestExtended, res: Response, next: NextFunction): void {
  res.on(`finish`, () => onResFinished(req, res));
  next();
}

function onResFinished(req: RequestExtended, res: Response): void {
  res.removeListener(`finish`, onResFinished);
  getLogger().info(messageConstructor(req.context.id, `Response sent, code: ${res.statusCode}`));
}

export {
  responseStatusCodeMiddleware,
};
