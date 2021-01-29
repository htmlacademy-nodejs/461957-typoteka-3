import {searchRouter} from "./search.router";
import {APIRoutes} from "../../../constants-es6";
import {articleRouter} from "./articles.router";
import {categoriesRouter} from "./categories.router";
import {
  articlesControllerFactory,
  categoriesControllerFactory,
  commentsControllerFactory,
  searchControllerFactory,
} from "../controllers";
import {Router} from "express";
import {categoriesStatisticsRouter} from "./categories-statistics.router";
import {ICategoryModel} from "../data-access/models/category";
import {IArticleModel} from "../data-access/models/article";
import {ICommentModel} from "../data-access/models/comment";

export const apiRouter = ({
  CategoryModel,
  ArticleModel,
  CommentModel,
}: {
  CategoryModel: ICategoryModel;
  ArticleModel: IArticleModel;
  CommentModel: ICommentModel;
}): Router => {
  const router = Router();
  const articlesController = articlesControllerFactory({
    ArticleModel,
    CategoryModel,
    CommentModel,
  });
  const categoriesController = categoriesControllerFactory({CategoryModel});
  const searchController = searchControllerFactory({ArticleModel});
  const commentsController = commentsControllerFactory({CommentModel});

  router.use(APIRoutes.ARTICLES, articleRouter(articlesController, commentsController));
  router.use(APIRoutes.CATEGORIES, categoriesRouter(articlesController, categoriesController));
  router.use(APIRoutes.CATEGORIES_STATISTICS, categoriesStatisticsRouter(categoriesController));
  router.use(APIRoutes.SEARCH, searchRouter(searchController));

  return router;
};
