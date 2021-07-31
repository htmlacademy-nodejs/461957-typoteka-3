import {NextFunction, Response} from "express";

import {getLogger, messageConstructor} from "../../logger";
import {IRequestExtended} from "../../models/interfaces/request-extended";

function logRouteMiddleware(req: IRequestExtended, res: Response, next: NextFunction): void {
  getLogger().info(messageConstructor(req.context.id, `Request URL: '${req.url}'`));
  next();
}

export {logRouteMiddleware};
