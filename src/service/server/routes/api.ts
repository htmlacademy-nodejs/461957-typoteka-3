import {searchRouter} from "./search.router";
import {APIRoutes} from "../../../constants-es6";
import {articleRouter} from "./articles.router";
import {categoriesRouter} from "./categories.router";
import {dataProviderService} from "../services";
import {articlesControllerFactory, categoriesControllerFactory, searchControllerFactory} from "../controllers";
import {Router} from "express";
import {categoriesStatisticsRouter} from "./categories-statistics.router";
import {ICategoryModel} from "../data-access/models/category";
import {IArticleModel} from "../data-access/models/article";
import {ICommentModel} from "../data-access/models/comment";
import {IIntermediateModel} from "../data-access/models/intermediate";

export const apiRouter = ({
  CategoryModel,
  ArticleCategoryModel,
  ArticleModel,
}: {
  CategoryModel: ICategoryModel;
  ArticleModel: IArticleModel;
  CommentModel: ICommentModel;
  ArticleCategoryModel: IIntermediateModel;
}): Router => {
  const router = Router();
  const articlesController = articlesControllerFactory({
    ArticleModel,
    CategoryModel,
    ArticleCategoryModel,
    dataProviderService,
  });
  const categoriesController = categoriesControllerFactory({CategoryModel, ArticleCategoryModel});
  const searchController = searchControllerFactory({ArticleModel});

  router.use(APIRoutes.ARTICLES, articleRouter(articlesController));
  router.use(APIRoutes.CATEGORIES, categoriesRouter(articlesController, categoriesController));
  router.use(APIRoutes.CATEGORIES_STATISTICS, categoriesStatisticsRouter(categoriesController));
  router.use(APIRoutes.SEARCH, searchRouter(searchController));

  return router;
};
