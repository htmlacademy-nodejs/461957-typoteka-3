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

articlesRouter.get(`/:id`, (req, res, next) => {
  const articleId = req.params.id;
  // TODO: Get article;
  if (articleId !== null) {
    return res.send(articleId);
  }
  next();
});

articlesRouter.get(`/edit/:id`, (req, res, next) => {
  const articleId = req.params.id;
  // TODO: Get article;
  if (articleId !== null) {
    return res.send(`Edit article ${articleId}`);
  }
  next();
});
