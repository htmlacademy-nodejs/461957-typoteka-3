import type {Request} from "express";

import type {Context} from "../context";

interface RequestExtended extends Request {
  context?: Context;
}

export {
  RequestExtended,
};
