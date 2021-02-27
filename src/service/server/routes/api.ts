import {searchRouter} from "./search.router";
import {APIRoutes} from "../../../constants-es6";
import {articleRouter} from "./articles.router";
import {categoriesRouter} from "./categories.router";
import {
  articlesControllerFactory,
  categoriesControllerFactory,
  commentsControllerFactory,
  searchControllerFactory,
  usersControllerFactory,
} from "../controllers";
import {Router} from "express";
import {categoriesStatisticsRouter} from "./categories-statistics.router";
import {usersRouter} from "./users.router";
import {ICategoryModel} from "../data-access/models/category";
import {IArticleModel} from "../data-access/models/article";
import {ICommentModel} from "../data-access/models/comment";
import {IUserModel} from "../data-access/models/user";

export const apiRouter = ({
  CategoryModel,
  ArticleModel,
  CommentModel,
  UserModel,
}: {
  CategoryModel: ICategoryModel;
  ArticleModel: IArticleModel;
  CommentModel: ICommentModel;
  UserModel: IUserModel;
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
  const usersController = usersControllerFactory({UserModel});

  router.use(APIRoutes.ARTICLES, articleRouter(articlesController, commentsController));
  router.use(APIRoutes.CATEGORIES, categoriesRouter(articlesController, categoriesController));
  router.use(APIRoutes.CATEGORIES_STATISTICS, categoriesStatisticsRouter(categoriesController));
  router.use(APIRoutes.SEARCH, searchRouter(searchController));
  router.use(APIRoutes.USERS, usersRouter(usersController));

  return router;
};
