import {Router} from "express";
import {articlesController} from "../controllers";

// eslint-disable-next-line new-cap
export const articlesRouter = Router();

articlesRouter.get(`/`, async (req, res) => articlesController.getArticles(req, res));
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
