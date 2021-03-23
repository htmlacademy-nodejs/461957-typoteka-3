import {Request, Response, Router} from "express";
import {APIRoutes, HttpCode} from "../../../constants-es6";
import {ArticlesController} from "../controllers/articles.controller";
import {getPaginationFromReqQuery} from "./utilities/get-pagination-from-req-query";
import {validateNewArticle} from "../validators";
import {commentsRouter} from "./comments.router";
import {CommentsController} from "../controllers/comments.controller";
import {authMiddleware} from "../middlewares/";

export const articleRouter = (
  articlesController: ArticlesController,
  commentsController: CommentsController,
): Router => {
  const router = Router();

  router.get(`/`, async (req: Request, res: Response) => {
    const {limit, offset} = getPaginationFromReqQuery(req);
    const areCommentsRequired = Boolean(req.query?.comments);
    const {status = HttpCode.OK, payload} = await articlesController.getArticles({
      limit,
      offset,
      areCommentsRequired: areCommentsRequired ? areCommentsRequired : undefined,
    });
    return res.status(status).send(payload);
  });
  router.get(`/:id`, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await articlesController.getArticleById(id);
    return res.status(status).send(payload);
  });
  router.post(`/`, [authMiddleware], async (req: Request, res: Response) => {
    try {
      const newArticle = await validateNewArticle(req.body);
      const {status = HttpCode.OK, payload} = await articlesController.createNewArticle(newArticle);
      res.status(status).send(payload);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST).send(e);
    }
  });
  router.put(`/:id`, [authMiddleware], async (req: Request, res: Response) => {
    try {
      const articleId = parseInt(req.params.id, 10);
      const articleContent = await validateNewArticle(req.body);
      const {status = HttpCode.OK, payload} = await articlesController.updateArticle(articleId, articleContent);
      res.status(status).send(payload);
    } catch (e) {
      res.status(HttpCode.BAD_REQUEST).send(e);
    }
  });
  router.delete(`/:id`, [authMiddleware], async (req: Request, res: Response) => {
    const articleId = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await articlesController.deleteArticle(articleId);
    res.status(status).send(payload);
  });

  router.use(`/:id` + APIRoutes.COMMENTS, commentsRouter(commentsController));

  return router;
};
