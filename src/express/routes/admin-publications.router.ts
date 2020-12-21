import {NextFunction, Request, Response, Router} from "express";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {AdminPublicationsPage} from "../views/pages/AdminPublicationsPage";
import {AdminCommentsPage} from "../views/pages/AdminCommentsPage";
import {SSRError} from "../errors/ssr-error";

export const adminPublicationsRouter = Router();

adminPublicationsRouter.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await dataProviderService.getArticles();
    if (articles === null) {
      return next(new SSRError({message: `Failed to get Admin articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
    streamPage(res, AdminPublicationsPage, {articles});
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to get Admin articles`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});

adminPublicationsRouter.get(ClientRoutes.ADMIN.COMMENTS, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listOfComments = await dataProviderService.getComments(3);
    if (listOfComments === null) {
      return next(new SSRError({message: `Failed to get Admin comments`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
    streamPage(res, AdminCommentsPage, {listOfComments});
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to get Admin comments`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});
