import type {Request} from "express";
import type {Context} from "../context";

export interface RequestExtended extends Request {
  context?: Context;
}
