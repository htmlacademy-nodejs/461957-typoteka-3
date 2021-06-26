import {IArticleModel} from "../models/article";
import {ICategoryModel} from "../models/category";
import {ICommentModel} from "../models/comment";
import {IRefreshTokenModel} from "../models/refresh-tokens";
import {IUserModel} from "../models/user";

import {ArticlesService} from "./articles.service";
import {AuthService} from "./auth.service";
import {CategoriesService} from "./categories.service";
import {CommentsService} from "./comments.service";
import {SearchService} from "./search.service";
import {UsersService} from "./users.service";

export const categoriesServiceFactory = (CategoryModel: ICategoryModel): CategoriesService =>
  new CategoriesService(CategoryModel);

export const searchServiceFactory = (ArticleModel: IArticleModel): SearchService => new SearchService(ArticleModel);

export const articlesServiceFactory = (ArticleModel: IArticleModel): ArticlesService =>
  new ArticlesService(ArticleModel);

export const commentsServiceFactory = (CommentsModel: ICommentModel): CommentsService =>
  new CommentsService(CommentsModel);

export const usersServiceFactory = (UserModel: IUserModel): UsersService => new UsersService(UserModel);

export const authServiceFactory = (UserModel: IUserModel, RefreshTokenModel: IRefreshTokenModel): AuthService =>
  new AuthService(UserModel, RefreshTokenModel);
