import {ArticlesController} from "../controllers/articles.controller";
import {Router} from "express";
import {HttpCode} from "../../../constants-es6";
import {validateNewComment} from "../validators";

export const commentsRouter = (articlesController: ArticlesController): Router => {
  const router = Router({mergeParams: true});

  router.get(`/`, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await articlesController.getCommentsByArticleId(id);
    return res.status(status).send(payload);
  });
  router.delete(`/:commentId`, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const {status = HttpCode.OK, payload} = await articlesController.deleteCommentById(articleId, commentId);
    res.status(status).send(payload);
  });
  router.post(`/`, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    try {
      const newComment = await validateNewComment(req.body);
      const {status = HttpCode.OK, payload} = await articlesController.createComment(articleId, newComment);
      res.status(status).send(payload);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST).send(e);
    }
  });
  router.get(`/:commentId`, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const {status = HttpCode.OK, payload} = await articlesController.getComment(articleId, commentId);
    return res.status(status).send(payload);
  });

  return router;
};
