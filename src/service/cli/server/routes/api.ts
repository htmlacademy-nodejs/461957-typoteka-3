import {Router} from "express";
import {articlesRouter} from "./articles.router";
import {categoriesRouter} from "./categories.router";
import {searchRouter} from "./search.router";
import {Routes} from "../../../../constants-es6";

// eslint-disable-next-line new-cap
export const apiRouter = Router();
apiRouter.use(Routes.ARTICLES, articlesRouter);
apiRouter.use(Routes.CATEGORIES, categoriesRouter);
apiRouter.use(Routes.SEARCH, searchRouter);
