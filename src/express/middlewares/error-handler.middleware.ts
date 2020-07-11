import {SSRError} from "../errors/ssr-error";
import {streamPage} from "../utils/stream-page";
import {ErrorPage404} from "../views/pages/ErrorPage404";
import {ErrorPage500} from "../views/pages/ErrorPage500";

export function errorHandlerMiddleware(err: SSRError, req, res, next): void {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  if (err.shouldRedirect) {
    streamPage(res, ErrorPage404);
  } else {
    streamPage(res, ErrorPage500);
  }
}
