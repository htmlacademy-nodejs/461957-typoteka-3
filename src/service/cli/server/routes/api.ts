import {Router} from "express";
import {articlesRouter} from "./articles.router";
import {categoriesRouter} from "./categories.router";
import {searchRouter} from "./search.router";
import {APIRoutes} from "../../../../constants-es6";

// eslint-disable-next-line new-cap
export const apiRouter = Router();
apiRouter.use(APIRoutes.ARTICLES, articlesRouter);
apiRouter.use(APIRoutes.CATEGORIES, categoriesRouter);
apiRouter.use(APIRoutes.SEARCH, searchRouter);
