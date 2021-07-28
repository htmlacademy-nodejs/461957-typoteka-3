import type {NextFunction, Request, Response} from "express";

import {IRequestExtended} from "../../models/interfaces/request-extended";
import {RequestContext} from "../../models/interfaces/request-context";

function assignLogFieldsMiddleware(req: Request, res: Response, next: NextFunction): void {
  (req as IRequestExtended).context = new RequestContext();
  next();
}

export {assignLogFieldsMiddleware};
