import {SSRError} from "../errors/ssr-error";
import {NextFunction, Request, Response} from "express";

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
  next(
    new SSRError({
      message: `${req.ip} tried to ${req.method} ${req.originalUrl}`,
      statusCode: 404,
      shouldRedirect: true,
    }),
  );
}
