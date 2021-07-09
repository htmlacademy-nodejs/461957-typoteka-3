import {NextFunction, Request, Router} from "express";

import {HttpCode} from "../../constants";
import {ICommentId} from "../../types/interfaces/comment-id";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {SSRError} from "../errors/ssr-error";
import {getAccessTokenFromCookies} from "../helpers/cookie.helper";
import {getArticleLink} from "../helpers/link-resolver";
import {isAuthorUserMiddleware} from "../middlewares";
import {ICommentByAuthor} from "../models/interfaces/comment-by-author";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {AdminCommentsPage} from "../views/pages/admin-comments-page";
import {AdminPublicationsPage} from "../views/pages/admin-publications-page";

const adminPublicationsRouter = Router();

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
      const listOfComments = await dataProviderService.getComments(getAccessTokenFromCookies(req));
      const comments: (ICommentByAuthor & ICommentId)[] = listOfComments.map(item => ({
        text: item.text,
        id: item.id,
        link: getArticleLink(item.articleId),
        user: item.user,
        articleTitle: item.articleTitle,
        createdDate: new Date(Date.parse((item.createdDate as unknown) as string)),
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

export {adminPublicationsRouter};
