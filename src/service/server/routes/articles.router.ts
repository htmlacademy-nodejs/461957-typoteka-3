import {Router} from "express";
import {HttpCode} from "../../../constants-es6";
import {newCommentValidator} from "../../middlewares";
import {ArticleComment} from "../../../types/article-comment";
import {IArticleId} from "../../../types/article";
import {ArticlesController} from "../controllers/articles.controller";
import {getPaginationFromReqQuery} from "./utilities/get-pagination-from-req-query";
import {validateArticle, validateNewArticle} from "../validators/validate-article";
import {IArticleCreating} from "../../../types/interfaces/article-creating";

export const articleRouter = (articlesController: ArticlesController): Router => {
  const router = Router();

  router.get(`/`, async (req, res) => {
    const {limit, offset} = getPaginationFromReqQuery(req);
    const areCommentsRequired = Boolean(req.query?.comments);
    const {status = HttpCode.OK, payload} = await articlesController.getArticles({
      limit,
      offset,
      areCommentsRequired: areCommentsRequired ? areCommentsRequired : undefined,
    });
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
    const articleId = parseInt(req.params.articleId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const {status = HttpCode.OK, payload} = await articlesController.getComment(articleId, commentId);
    return res.status(status).send(payload);
  });
  router.post(`/`, async (req, res) => {
    try {
      const newArticle = await validateNewArticle(req.body);
      const {status = HttpCode.OK, payload} = await articlesController.createNewArticle(newArticle);
      res.status(status).send(payload);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST).send(e);
    }
  });
  router.put(`/:id`, async (req, res) => {
    try {
      const articleId = parseInt(req.params.id, 10);
      const articleContent = await validateArticle(req.body as IArticleCreating & IArticleId);
      const {status = HttpCode.OK, payload} = await articlesController.updateArticle(articleId, articleContent);
      res.status(status).send(payload);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST).send(e);
    }
  });
  router.delete(`/:id`, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await articlesController.deleteArticle(articleId);
    res.status(status).send(payload);
  });

  return router;
};
