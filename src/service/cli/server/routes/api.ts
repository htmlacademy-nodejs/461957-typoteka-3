import {Router} from "express";
import {articlesRouter} from "./articles.router";
import {categoriesRouter} from "./categories.router";
import {searchRouter} from "./search.router";

// eslint-disable-next-line new-cap
export const apiRouter = Router();
apiRouter.use(`/articles`, articlesRouter);
apiRouter.use(`/categories`, categoriesRouter);
apiRouter.use(`/search`, searchRouter);
