import {Request} from "express";

import {RequestContext} from "../request-context";

export interface IRequestExtended extends Request {
  context: RequestContext;
}
