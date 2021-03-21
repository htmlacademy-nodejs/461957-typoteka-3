import {CategoriesService} from "./categories.service";
import {ICategoryModel} from "../models/category";
import {IArticleModel} from "../models/article";
import {SearchService} from "./search.service";
import {ArticlesService} from "./articles.service";
import {ICommentModel} from "../models/comment";
import {CommentsService} from "./comments.service";
import {UsersService} from "./users.service";
import {IUserModel} from "../models/user";
import {AuthService} from "./auth.service";

export const categoriesServiceFactory = (CategoryModel: ICategoryModel): CategoriesService =>
  new CategoriesService(CategoryModel);

export const searchServiceFactory = (ArticleModel: IArticleModel): SearchService => new SearchService(ArticleModel);

export const articlesServiceFactory = (ArticleModel: IArticleModel): ArticlesService =>
  new ArticlesService(ArticleModel);

export const commentsServiceFactory = (CommentsModel: ICommentModel): CommentsService =>
  new CommentsService(CommentsModel);

export const usersServiceFactory = (UserModel: IUserModel): UsersService => new UsersService(UserModel);

export const authServiceFactory = (UserModel: IUserModel): AuthService => new AuthService(UserModel);
