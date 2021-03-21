import {NextFunction, Request, Router} from "express";
import {dataProviderService} from "../services";
import {SSRError} from "../errors/ssr-error";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {streamPage} from "../utils/stream-page";
import {ICommentCreating} from "../../types/interfaces/comment-creating";
import {prepareArticlePage} from "../helpers/prepare-article-page";
import multer from "multer";
import {IResponseExtended} from "../../types/interfaces/response-extended";

const multerMiddleware = multer();
export const commentsRouter = Router();

commentsRouter.post(
  `/:id`,
  [multerMiddleware.none()],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    const articleId = parseInt(req.params.id, 10);
    const {text} = req.body as ICommentCreating;
    const comment: ICommentCreating = {text, createdDate: new Date(), articleId};
    try {
      const commentValidationResponse = await dataProviderService.createComment(articleId, comment);
      if (!commentValidationResponse) {
        return res.redirect(`${ClientRoutes.ARTICLES.INDEX}/${articleId}`);
      }
      const {page: articlePage, props} = await prepareArticlePage({articleId, currentUser: res.locals.currentUser});
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
