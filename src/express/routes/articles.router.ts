import {Router} from "express";
import {streamPage} from "../utils/stream-page";
import {NewArticlePage} from "../views/pages/NewArticlePage";

export const articlesRouter = Router();

articlesRouter.get(`/add`, (req, res) => streamPage(res, NewArticlePage));

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

articlesRouter.get(`/edit/:id`, (req, res, next) => {
  const articleId = req.params.id;
  // TODO: Get article;
  if (articleId !== null) {
    return res.send(`Edit article ${articleId}`);
  }
  next();
});
