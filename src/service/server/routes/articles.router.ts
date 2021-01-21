import {Router} from "express";
import {HttpCode} from "../../../constants-es6";
import {newArticleValidator, newCommentValidator} from "../../middlewares";
import {ArticleComment} from "../../../types/article-comment";
import {Article, NewArticle} from "../../../types/article";
import {ArticlesController} from "../controllers/articles.controller";

export const articleRouter = (articlesController: ArticlesController): Router => {
  const router = Router();

  router.get(`/`, async (req, res) => {
    const count = Number(req.query?.count as string);
    // TODO: implement pagination
    const areCommentsRequired = Boolean(req.query?.comments);
    const {status = HttpCode.OK, payload} = await articlesController.getArticles(
      areCommentsRequired ? areCommentsRequired : undefined,
    );
    return res.status(status).send(payload);
  });
  router.get(`/:id`, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await articlesController.getArticleById(id);
    return res.status(status).send(payload);
  });
  router.get(`/:id/comments/`, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await articlesController.getCommentsByArticleId(id);
    return res.status(status).send(payload);
  });
  router.delete(`/:articleId/comments/:commentId`, async (req, res) => {
    const articleId = parseInt(req.params.articleId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const {status = HttpCode.OK, payload} = await articlesController.deleteCommentById(articleId, commentId);
    res.status(status).send(payload);
  });
  router.post(`/:id/comments/`, newCommentValidator, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const commentText = (req.body as ArticleComment)?.text;
    const {status = HttpCode.OK, payload} = await articlesController.createComment(articleId, commentText);
    return res.status(status).send(payload);
  });
  router.get(`/:articleId/comments/:commentId`, async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
    const {status = HttpCode.OK, payload} = await articlesController.getCommentById(commentId);
    return res.status(status).send(payload);
  });
  router.post(`/`, newArticleValidator, async (req, res) => {
    const newArticle = req.body as NewArticle;
    const {status = HttpCode.OK, payload} = await articlesController.createNewArticle(newArticle);
    res.status(status).send(payload);
  });
  router.put(`/:id`, newArticleValidator, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const articleContent = req.body as Article;
    const {status = HttpCode.OK, payload} = await articlesController.updateArticle(articleId, articleContent);
    res.status(status).send(payload);
  });
  router.delete(`/:id`, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await articlesController.deleteArticle(articleId);
    res.status(status).send(payload);
  });

  return router;
};
