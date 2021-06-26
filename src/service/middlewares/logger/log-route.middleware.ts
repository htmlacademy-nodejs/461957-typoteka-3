import {NextFunction, Response} from "express";

import {getLogger} from "../../logger";
import {messageConstructor} from "../../logger/message-constructor";
import {RequestExtended} from "../../models/types/request-extended";

export function logRouteMiddleware(req: RequestExtended, res: Response, next: NextFunction): void {
  getLogger().info(messageConstructor(req.context.id, `Request URL: '${req.url}'`));
  next();
}
