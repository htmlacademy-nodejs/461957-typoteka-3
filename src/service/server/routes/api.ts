import {Router} from "express";

import {APIRoute} from "../../../shared/constants/routes/api-route";
import {
  articlesControllerFactory,
  authControllerFactory,
  categoriesControllerFactory,
  commentsControllerFactory,
  searchControllerFactory,
  usersControllerFactory,
} from "../controllers";
import {IArticleModel} from "../data-access/models/article";
import {ICategoryModel} from "../data-access/models/category";
import {ICommentModel} from "../data-access/models/comment";
import {IRefreshTokenModel} from "../data-access/models/refresh-tokens";
import {IUserModel} from "../data-access/models/user";

import {articleRouter} from "./articles.router";
import {authRouter} from "./auth.router";
import {categoriesStatisticsRouter} from "./categories-statistics.router";
import {categoriesRouter} from "./categories.router";
import {commentsRouter} from "./comments.router";
import {searchRouter} from "./search.router";
import {usersRouter} from "./users.router";

const apiRouter = ({
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
  const usersController = usersControllerFactory({UserModel, CommentModel});
  const authController = authControllerFactory({UserModel, RefreshTokenModel});

  router.use(APIRoute.ARTICLES, articleRouter(articlesController));
  router.use(APIRoute.COMMENTS, commentsRouter(commentsController));
  router.use(APIRoute.CATEGORIES, categoriesRouter(articlesController, categoriesController));
  router.use(APIRoute.CATEGORIES_STATISTICS, categoriesStatisticsRouter(categoriesController));
  router.use(APIRoute.SEARCH, searchRouter(searchController));
  router.use(APIRoute.USERS, usersRouter(usersController));
  router.use(APIRoute.AUTH, authRouter(authController));

  return router;
};

export {apiRouter};
