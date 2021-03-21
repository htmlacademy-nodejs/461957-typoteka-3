import {searchRouter} from "./search.router";
import {APIRoutes} from "../../../constants-es6";
import {articleRouter} from "./articles.router";
import {categoriesRouter} from "./categories.router";
import {
  articlesControllerFactory,
  authControllerFactory,
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
import {authRouter} from "./auth.router";
import {IRefreshTokenModel} from "../data-access/models/refresh-tokens";

export const apiRouter = ({
  CategoryModel,
  ArticleModel,
  CommentModel,
  UserModel,
  RefreshTokenModel,
}: {
  CategoryModel: ICategoryModel;
  ArticleModel: IArticleModel;
  CommentModel: ICommentModel;
  UserModel: IUserModel;
  RefreshTokenModel: IRefreshTokenModel;
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
  const authController = authControllerFactory({UserModel, RefreshTokenModel});

  router.use(APIRoutes.ARTICLES, articleRouter(articlesController, commentsController));
  router.use(APIRoutes.CATEGORIES, categoriesRouter(articlesController, categoriesController));
  router.use(APIRoutes.CATEGORIES_STATISTICS, categoriesStatisticsRouter(categoriesController));
  router.use(APIRoutes.SEARCH, searchRouter(searchController));
  router.use(APIRoutes.USERS, usersRouter(usersController));
  router.use(APIRoutes.AUTH, authRouter(authController));

  return router;
};
