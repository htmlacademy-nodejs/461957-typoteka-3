import type {NextFunction, Request, Response} from "express";
import {RequestContext} from "../../models/request-context";
import {IRequestExtended} from "../../models/interfaces/request-extended";

export function assignLogFieldsMiddleware(req: Request, res: Response, next: NextFunction): void {
  (req as IRequestExtended).context = new RequestContext();
  next();
}
