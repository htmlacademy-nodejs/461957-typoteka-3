import {SSRError} from "../errors/ssr-error";
import {Request} from "express";

export function notFoundMiddleware(req: Request, res, next): void {
  next(
    new SSRError({
      message: `${req.ip} tried to ${req.method} ${req.originalUrl}`,
      statusCode: 404,
      shouldRedirect: true,
    }),
  );
}
