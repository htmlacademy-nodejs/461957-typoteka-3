import type {NextFunction, Request, Response} from "express";

import {IRequestExtended} from "../../../types/interfaces/request-extended";

import {RequestContext} from "./request-context";

function assignLogFieldsMiddleware(req: Request, res: Response, next: NextFunction): void {
  (req as IRequestExtended).context = new RequestContext();
  next();
}

export {assignLogFieldsMiddleware};
