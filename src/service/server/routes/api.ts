import {searchRouter} from "./search.router";
import {APIRoutes} from "../../../constants-es6";
import {articleRouter} from "./articles.router";
import {categoriesRouter} from "./categories.router";
import {dataProviderService} from "../services";
import {articlesControllerFabric, categoriesControllerFabric, searchControllerFabric} from "../controllers";
import {Router} from "express";
import {ICategoryModel} from "../data-access/models/category";
import {categoriesStatisticsRouter} from "./categories-statistics.router";

export const apiRouter = ({CategoryModel}: {CategoryModel: ICategoryModel}): Router => {
  const router = Router();
  const articlesController = articlesControllerFabric(dataProviderService);
  const categoriesController = categoriesControllerFabric(dataProviderService, CategoryModel);
  const searchController = searchControllerFabric(dataProviderService);

  router.use(APIRoutes.ARTICLES, articleRouter(articlesController));
  router.use(APIRoutes.CATEGORIES, categoriesRouter(articlesController, categoriesController));
  router.use(APIRoutes.CATEGORIES_STATISTICS, categoriesStatisticsRouter(categoriesController));
  router.use(APIRoutes.SEARCH, searchRouter(searchController));

  return router;
};
