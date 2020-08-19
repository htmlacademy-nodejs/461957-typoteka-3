import {Router} from "express";
import {streamPage} from "../utils/stream-page";
import {NewArticlePage} from "../views/pages/NewArticlePage";
import {SSRError} from "../errors/ssr-error";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services/data-provider.service";
import {ArticlePage} from "../views/pages/ArticlePage";
import multer from "multer";
import {NewArticle} from "../../types/new-article";
import {ArticleValidationResponse} from "../../types/article-validation-response";

const multerMiddleware = multer();
export const articlesRouter = Router();

articlesRouter.get(`/add`, (req, res) => streamPage(res, NewArticlePage, {endPoint: ClientRoutes.ARTICLES.ADD}));

articlesRouter.post(`/add`, multerMiddleware.none(), async (req, res, next) => {
  const newArticle = req.body as NewArticle;
  try {
    const response: true | ArticleValidationResponse = await dataProviderService.createArticle(newArticle);
    if (response === true) {
      res.redirect(ClientRoutes.ADMIN.INDEX);
    } else {
      // TODO: Show validation message
      res.send(JSON.stringify(response));
    }
  } catch (e) {
    console.log(e);
    next(
      new SSRError({
        message: `Failed to create an article`,
        statusCode: HttpCode.BAD_REQUEST,
        errorPayload: e as Error,
      }),
    );
  }
});

articlesRouter.get(`/category/:id`, (req, res, next) => {
  const categoryId = req.params.id;
  // TODO: Get categories
  if (categoryId !== null) {
    return res.send(`articles-by-category`);
  }
  next();
});

articlesRouter.get(`/:id`, async (req, res, next) => {
  const articleId = req.params.id;
  try {
    const article = await dataProviderService.getArticleById(articleId);
    if (article !== null) {
      streamPage(res, ArticlePage, {article});
    } else {
      next(new SSRError({message: `Failed to get article`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
  } catch (e) {
    next(
      new SSRError({
        message: `Failed to get article`,
        statusCode: HttpCode.NOT_FOUND,
        errorPayload: e as Error,
      }),
    );
  }
});

articlesRouter.get(`/edit/:id`, async (req, res, next) => {
  const articleId = req.params.id;
  try {
    const article = await dataProviderService.getArticleById(articleId);
    if (article !== null) {
      streamPage(res, NewArticlePage, {
        article,
        endPoint: ClientRoutes.ARTICLES.INDEX + `/` + articleId,
      });
    } else {
      next(new SSRError({message: `Failed to get article`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
  } catch (e) {
    next(
      new SSRError({
        message: `Failed to get article`,
        statusCode: HttpCode.NOT_FOUND,
        errorPayload: e as Error,
      }),
    );
  }
});
