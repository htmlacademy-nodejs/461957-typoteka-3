import {IArticleModel} from "../data-access/models/article";
import {ICategoryModel} from "../data-access/models/category";
import {ICommentModel} from "../data-access/models/comment";
import {IRefreshTokenModel} from "../data-access/models/refresh-tokens";
import {IUserModel} from "../data-access/models/user";
import {
  articlesServiceFactory,
  authServiceFactory,
  categoriesServiceFactory,
  commentsServiceFactory,
  searchServiceFactory,
  usersServiceFactory,
} from "../data-access/services";

import {ArticlesController} from "./articles.controller";
import {AuthController} from "./auth.controller";
import {CategoriesController} from "./categories.controller";
import {CommentsController} from "./comments.controller";
import {SearchController} from "./search.controller";
import {UsersController} from "./users.controller";

export const articlesControllerFactory = ({
  ArticleModel,
  CategoryModel,
  CommentModel,
}: {
  ArticleModel: IArticleModel;
  CategoryModel: ICategoryModel;
  CommentModel: ICommentModel;
}): ArticlesController =>
  new ArticlesController(
    articlesServiceFactory(ArticleModel),
    categoriesServiceFactory(CategoryModel),
    commentsServiceFactory(CommentModel),
  );

export const categoriesControllerFactory = ({CategoryModel}: {CategoryModel: ICategoryModel}): CategoriesController =>
  new CategoriesController(categoriesServiceFactory(CategoryModel));

export const searchControllerFactory = ({ArticleModel}: {ArticleModel: IArticleModel}): SearchController =>
  new SearchController(searchServiceFactory(ArticleModel));

export const commentsControllerFactory = ({CommentModel}: {CommentModel: ICommentModel}): CommentsController =>
  new CommentsController(commentsServiceFactory(CommentModel));

export const usersControllerFactory = ({
  UserModel,
  CommentModel,
}: {
  UserModel: IUserModel;
  CommentModel: ICommentModel;
}): UsersController => new UsersController(usersServiceFactory(UserModel), commentsServiceFactory(CommentModel));

export const authControllerFactory = ({
  UserModel,
  RefreshTokenModel,
}: {
  UserModel: IUserModel;
  RefreshTokenModel: IRefreshTokenModel;
}): AuthController => new AuthController(authServiceFactory(UserModel, RefreshTokenModel));
