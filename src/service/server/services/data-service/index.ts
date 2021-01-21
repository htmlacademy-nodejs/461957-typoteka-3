import {CategoriesService} from "./categories.service";
import {ICategoryModel} from "../../data-access/models/category";
import {IIntermediateModel} from "../../data-access/models/intermediate";
import {IArticleModel} from "../../data-access/models/article";
import {SearchService} from "./search.service";
import {ArticlesService} from "./articles.service";
import {ICommentModel} from "../../data-access/models/comment";
import {CommentsService} from "./comments.service";

export const categoriesServiceFactory = (
  CategoryModel: ICategoryModel,
  ArticleCategoryModel: IIntermediateModel,
): CategoriesService => new CategoriesService(CategoryModel, ArticleCategoryModel);

export const searchServiceFactory = (ArticleModel: IArticleModel): SearchService => new SearchService(ArticleModel);

export const articlesServiceFactory = (
  ArticleModel: IArticleModel,
  ArticleCategoryModel: IIntermediateModel,
): ArticlesService => new ArticlesService(ArticleModel, ArticleCategoryModel);

export const commentsServiceFactory = (CommentsModel: ICommentModel): CommentsService =>
  new CommentsService(CommentsModel);
