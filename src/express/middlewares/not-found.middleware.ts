import {NextFunction, Request, Response} from "express";

import {SSRError} from "../errors/ssr-error";

function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
  next(
    new SSRError({
      message: `${req.ip} tried to ${req.method} ${req.originalUrl}`,
      statusCode: 404,
      shouldRedirect: true,
    }),
  );
}

export {
  notFoundMiddleware,
};
