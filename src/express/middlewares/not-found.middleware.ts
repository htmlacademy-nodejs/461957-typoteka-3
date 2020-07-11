import {SSRError} from "../errors/ssr-error";

export function notFoundMiddleware(req, res, next): void {
  next(new SSRError({message: `${req.ip} tried to reach ${req.originalUrl}`, statusCode: 404, shouldRedirect: true}));
}
