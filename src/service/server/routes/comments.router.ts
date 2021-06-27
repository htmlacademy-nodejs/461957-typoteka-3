import {Router} from "express";

import {HttpCode} from "../../../constants";
import {CommentsController} from "../controllers/comments.controller";
import {validateNewComment} from "../validators";

export const commentsRouter = (commentsController: CommentsController): Router => {
  const router = Router({mergeParams: true});

  router.get(`/`, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await commentsController.getCommentsByArticleId(id);
    return res.status(status).send(payload);
  });
  router.post(`/`, async (req, res) => {
    try {
      const newComment = await validateNewComment(req.body);
      const {status = HttpCode.OK, payload} = await commentsController.createComment(newComment);
      res.status(status).send(payload);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST).send(e);
    }
  });
  router.get(`/:commentId`, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const {status = HttpCode.OK, payload} = await commentsController.getComment(articleId, commentId);
    return res.status(status).send(payload);
  });
  router.delete(`/:commentId`, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const {status = HttpCode.OK, payload} = await commentsController.deleteCommentById(articleId, commentId);
    res.status(status).send(payload);
  });

  return router;
};
