import {NextFunction, Request, Router} from "express";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {AdminPublicationsPage} from "../views/pages/AdminPublicationsPage";
import {AdminCommentsPage} from "../views/pages/AdminCommentsPage";
import {SSRError} from "../errors/ssr-error";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {getAccessTokenFromCookies} from "../helpers/cookie.helper";

export const adminPublicationsRouter = Router();

adminPublicationsRouter.get(`/`, async (req: Request, res: IResponseExtended, next: NextFunction) => {
  try {
    const {items: articles} = await dataProviderService.getArticles({limit: undefined, offset: undefined});
    return streamPage(res, AdminPublicationsPage, {articles, currentUser: res.locals.currentUser});
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

adminPublicationsRouter.get(
  ClientRoutes.ADMIN.COMMENTS,
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    try {
      const listOfComments = await dataProviderService.getComments(3, getAccessTokenFromCookies(req));
      return streamPage(res, AdminCommentsPage, {listOfComments, currentUser: res.locals.currentUser});
    } catch (e) {
      return next(
        new SSRError({
          message: `Failed to get Admin comments`,
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          errorPayload: e as Error,
        }),
      );
    }
  },
);
