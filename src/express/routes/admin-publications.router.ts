import {NextFunction, Request, Router} from "express";
import {HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {AdminPublicationsPage} from "../views/pages/AdminPublicationsPage";
import {AdminCommentsPage} from "../views/pages/AdminCommentsPage";
import {SSRError} from "../errors/ssr-error";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {getAccessTokenFromCookies} from "../helpers/cookie.helper";
import {isAuthorUserMiddleware} from "../middlewares";
import {getArticleLink} from "../helpers/link-resolver";

export const adminPublicationsRouter = Router();

adminPublicationsRouter.get(
  `/`,
  [isAuthorUserMiddleware],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    try {
      const {items: articles} = await dataProviderService.getArticlesByUser({
        limit: undefined,
        offset: undefined,
        authorId: res.locals.currentUser.id,
      });
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
  },
);

adminPublicationsRouter.get(
  `/comments`,
  [isAuthorUserMiddleware],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    try {
      const listOfComments = await dataProviderService.getComments(3, getAccessTokenFromCookies(req));
      const comments = listOfComments.map(item => ({
        text: item.text,
        id: item.id,
        link: getArticleLink(item.articleId),
      }));
      return streamPage(res, AdminCommentsPage, {comments, currentUser: res.locals.currentUser});
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
