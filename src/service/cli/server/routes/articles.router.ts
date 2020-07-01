import {Router} from "express";
import {articlesController} from "../controllers";
import {HttpCode} from "../../../../constants-es6";
import {newArticleValidator} from "../../../middlewares/article-validator";

// eslint-disable-next-line new-cap
export const articlesRouter = Router();

articlesRouter.get(`/`, async (req, res) => {
  const {status = HttpCode.OK, payload} = await articlesController.getArticles();
  return res.status(status).send(payload);
});
articlesRouter.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const {status = HttpCode.OK, payload} = await articlesController.getArticleById(id);
  return res.status(status).send(payload);
});
articlesRouter.get(`/:id/comments/`, async (req, res) => {
  const id = req.params.id;
  const {status = HttpCode.OK, payload} = await articlesController.getCommentsByArticleId(id);
  return res.status(status).send(payload);
});
articlesRouter.get(`/:id/comments/:commentId`, async (req, res) => {
  const articleId = req.params.id;
  const commentId = req.params.commentId;
  const {status = HttpCode.OK, payload} = await articlesController.getArticleCommentById(articleId, commentId);
  return res.status(status).send(payload);
});
articlesRouter.post(`/`, newArticleValidator, async (req, res) => {
  const newArticle = req.body;
  const {status = HttpCode.OK, payload} = await articlesController.createNewArticle(newArticle);
  res.status(status).send(payload);
});
articlesRouter.put(`/:id`, newArticleValidator, async (req, res) => {
  const articleId = req.params.id;
  const articleContent = req.body;
  const {status = HttpCode.OK, payload} = await articlesController.updateArticle(articleId, articleContent);
  res.status(status).send(payload);
});
articlesRouter.delete(`/:id`, async (req, res) => {
  const articleId = req.params.id;
  const {status = HttpCode.OK, payload} = await articlesController.deleteArticle(articleId);
  res.status(status).send(payload);
});
