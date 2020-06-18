import {Router} from "express";
import {articlesController} from "../controllers";
import {HttpCode} from "../../../../constants-es6";

// eslint-disable-next-line new-cap
export const articlesRouter = Router();

articlesRouter.get(`/`, async (req, res) => {
  const {status = HttpCode.OK, payload} = await articlesController.getArticles();
  res.status(status).send(payload);
});
articlesRouter.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  await articlesController.getArticleById(req, res, id);
});
articlesRouter.get(`/:id/comments/`, async (req, res) => {
  const id = req.params.id;
  await articlesController.getCommentsByArticleId(req, res, id);
});
articlesRouter.get(`/:id/comments/:commentId`, async (req, res) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  await articlesController.getArticleCommentById(req, res, id, commentId);
});
