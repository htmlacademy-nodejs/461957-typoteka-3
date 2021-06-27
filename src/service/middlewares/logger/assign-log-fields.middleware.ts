import type {NextFunction, Request, Response} from "express";

import {Context} from "../../models/context";
import type {RequestExtended} from "../../models/types/request-extended";

export function assignLogFieldsMiddleware(req: Request, res: Response, next: NextFunction): void {
  (req as RequestExtended).context = new Context();
  next();
}
