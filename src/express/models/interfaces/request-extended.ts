import {Request} from "express";

import {RequestContext} from "../request-context";

interface IRequestExtended extends Request {
  context: RequestContext;
}

export {
  IRequestExtended,
};
