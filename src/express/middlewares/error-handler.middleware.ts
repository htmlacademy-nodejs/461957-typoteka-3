import {SSRError} from "../errors/ssr-error";
import {streamPage} from "../utils/stream-page";
import {ErrorPage404} from "../views/pages/ErrorPage404";
import {ErrorPage500} from "../views/pages/ErrorPage500";
import type {NextFunction, Request, Response} from "express";

export function errorHandlerMiddleware(err: SSRError, req: Request, res: Response, next: NextFunction): void {
  console.error(err);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  if (err.shouldRedirect) {
    streamPage(res, ErrorPage404);
  } else {
    streamPage(res, ErrorPage500);
  }
  next();
}
