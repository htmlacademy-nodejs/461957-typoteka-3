import {Router} from "express";

import {HttpCode} from "../../../constants";
import {CommentsController} from "../controllers/comments.controller";
import {validateNewComment} from "../validators";

const commentsRouter = (commentsController: CommentsController): Router => {
  const router = Router({mergeParams: true});

  router.get(`/article/:id`, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await commentsController.getCommentsByArticleId(articleId);
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
  router.get(`/article/:articleId/:commentId`, async (req, res) => {
    const articleId = parseInt(req.params.articleId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const {status = HttpCode.OK, payload} = await commentsController.getComment(articleId, commentId);
    return res.status(status).send(payload);
  });
  router.delete(`/article/:articleId/:commentId`, async (req, res) => {
    const articleId = parseInt(req.params.articleId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const {status = HttpCode.OK, payload} = await commentsController.deleteCommentById(articleId, commentId);
    res.status(status).send(payload);
  });
  router.get(`/recent`, async (req, res) => {
    console.log(`params`, req.query?.limit as string);
    const limit = req.query?.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const {status = HttpCode.OK, payload} = await commentsController.getRecent({limit});
    res.status(status).send(payload);
  });

  return router;
};

export {commentsRouter};
