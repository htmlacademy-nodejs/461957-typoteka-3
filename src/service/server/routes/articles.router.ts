import {Router} from "express";
import {articlesController} from "../controllers";
import {HttpCode} from "../../../constants-es6";
import {newArticleValidator, newCommentValidator} from "../../middlewares";
import {ArticleComment} from "../../../types/article-comment";
import {NewArticle} from "../../../types/new-article";
import {Article} from "../../../types/article";

const articlesRouter = Router();

articlesRouter.get(`/`, async (req, res) => {
  const count = Number(req.query?.count as string);
  const {status = HttpCode.OK, payload} = await articlesController.getArticles(count);
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
articlesRouter.delete(`/:articleId/comments/:commentId`, async (req, res) => {
  const articleId = req.params.articleId;
  const commentId = req.params.commentId;
  const {status = HttpCode.OK, payload} = await articlesController.deleteCommentById(articleId, commentId);
  res.status(status).send(payload);
});
articlesRouter.post(`/:id/comments/`, newCommentValidator, async (req, res) => {
  const articleId = req.params.id;
  const commentText = (req.body as ArticleComment)?.text;
  const {status = HttpCode.OK, payload} = await articlesController.createComment(articleId, commentText);
  return res.status(status).send(payload);
});
articlesRouter.get(`/:id/comments/:commentId`, async (req, res) => {
  const articleId = req.params.id;
  const commentId = req.params.commentId;
  const {status = HttpCode.OK, payload} = await articlesController.getArticleCommentById(articleId, commentId);
  return res.status(status).send(payload);
});
articlesRouter.post(`/`, newArticleValidator, async (req, res) => {
  const newArticle = req.body as NewArticle;
  const {status = HttpCode.OK, payload} = await articlesController.createNewArticle(newArticle);
  res.status(status).send(payload);
});
articlesRouter.put(`/:id`, newArticleValidator, async (req, res) => {
  const articleId = req.params.id;
  const articleContent = req.body as Article;
  const {status = HttpCode.OK, payload} = await articlesController.updateArticle(articleId, articleContent);
  res.status(status).send(payload);
});
articlesRouter.delete(`/:id`, async (req, res) => {
  const articleId = req.params.id;
  const {status = HttpCode.OK, payload} = await articlesController.deleteArticle(articleId);
  res.status(status).send(payload);
});

export {articlesRouter};
