import {Router} from "express";
import {articlesRouter} from "./articles.router";

export const apiRouter = Router();
apiRouter.use(`/articles`, articlesRouter);
apiRouter.use(`/categories `, () => {});
apiRouter.use(`/search`, () => {});
