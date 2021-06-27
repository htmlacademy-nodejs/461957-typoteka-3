import csrf from "csurf";
import {NextFunction, Request, Router} from "express";
import multer from "multer";

import {ClientRoute, HttpCode} from "../../constants-es6";
import {ICommentCreating} from "../../types/interfaces/comment-creating";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {SSRError} from "../errors/ssr-error";
import {getAccessTokenFromCookies} from "../helpers/cookie.helper";
import {prepareArticlePage} from "../helpers/prepare-article-page";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";

const csrfProtection = csrf({cookie: true});
const multerMiddleware = multer();
export const commentsRouter = Router();

commentsRouter.post(
  `/:id`,
  [multerMiddleware.none(), csrfProtection],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    const articleId = parseInt(req.params.id, 10);
    const {text} = req.body as ICommentCreating;
    const comment: ICommentCreating = {text, createdDate: new Date(), articleId, authorId: res.locals.currentUser.id};
    try {
      const commentValidationResponse = await dataProviderService.createComment(
        comment,
        getAccessTokenFromCookies(req),
      );
      if (!commentValidationResponse) {
        return res.redirect(`${ClientRoute.ARTICLES.INDEX}/${articleId}`);
      }
      const {page: articlePage, props} = await prepareArticlePage({
        articleId,
        currentUser: res.locals.currentUser,
        csrf: req.csrfToken(),
      });
      return streamPage(res, articlePage, {
        ...props,
        commentValidationResponse,
        previousPageUrl: req.header(`referer`),
      });
    } catch (e) {
      return next(
        new SSRError({
          message: `Failed to create comment`,
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          errorPayload: e as Error,
        }),
      );
    }
  },
);
