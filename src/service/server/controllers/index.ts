import {ArticlesController} from "./articles.controller";
import {CategoriesController} from "./categories.controller";
import {SearchController} from "./search.controller";
import {
  articlesServiceFactory,
  categoriesServiceFactory,
  commentsServiceFactory,
  searchServiceFactory,
  usersServiceFactory,
} from "../data-access/services";
import {ICategoryModel} from "../data-access/models/category";
import {IArticleModel} from "../data-access/models/article";
import {ICommentModel} from "../data-access/models/comment";
import {CommentsController} from "./comments.controller";
import {UsersController} from "./users.controller";
import {IUserModel} from "../data-access/models/user";
import {AuthController} from "./auth.controller";

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

export const usersControllerFactory = ({UserModel}: {UserModel: IUserModel}): UsersController =>
  new UsersController(usersServiceFactory(UserModel));

export const authControllerFactory = ({UserModel}: {UserModel: IUserModel}): AuthController =>
  new AuthController(usersServiceFactory(UserModel));
