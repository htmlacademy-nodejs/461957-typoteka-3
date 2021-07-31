import type {NextFunction, Request, Response} from "express";

import {SSRError} from "../errors/ssr-error";
import {streamPage} from "../utils/stream-page";
import {ErrorPage404} from "../views/pages/error-page-404";
import {ErrorPage500} from "../views/pages/error-page-500";

function errorHandlerMiddleware(err: SSRError, req: Request, res: Response, next: NextFunction): void {
  console.error(err.statusCode, err.message);
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

export {errorHandlerMiddleware};
