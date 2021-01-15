import {searchRouter} from "./search.router";
import {APIRoutes} from "../../../constants-es6";
import {articleRouter} from "./articles.router";
import {categoriesRouter} from "./categories.router";
import {dataProviderService} from "../services";
import {articlesControllerFabric, categoriesControllerFabric, searchControllerFabric} from "../controllers";
import {Router} from "express";
import {categoriesStatisticsRouter} from "./categories-statistics.router";
import {DatabaseModels} from "../data-access/models/define-models";

export const apiRouter = ({CategoryModel, ArticleCategoryModel}: Partial<DatabaseModels>): Router => {
  const router = Router();
  const articlesController = articlesControllerFabric(dataProviderService);
  const categoriesController = categoriesControllerFabric(CategoryModel, ArticleCategoryModel);
  const searchController = searchControllerFabric(dataProviderService);

  router.use(APIRoutes.ARTICLES, articleRouter(articlesController));
  router.use(APIRoutes.CATEGORIES, categoriesRouter(articlesController, categoriesController));
  router.use(APIRoutes.CATEGORIES_STATISTICS, categoriesStatisticsRouter(categoriesController));
  router.use(APIRoutes.SEARCH, searchRouter(searchController));

  return router;
};
