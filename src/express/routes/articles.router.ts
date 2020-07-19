import {Router} from "express";
import {streamPage} from "../utils/stream-page";
import {NewArticlePage} from "../views/pages/NewArticlePage";
import {SSRError} from "../errors/ssr-error";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services/data-provider.service";
import {ArticlePage} from "../views/pages/ArticlePage";

export const articlesRouter = Router();

articlesRouter.get(`/add`, (req, res) => streamPage(res, NewArticlePage, {endPoint: ClientRoutes.ARTICLES.ADD}));

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
        errorPayload: e,
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
        errorPayload: e,
      }),
    );
  }
});
