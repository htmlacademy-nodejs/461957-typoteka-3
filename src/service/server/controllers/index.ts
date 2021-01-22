import {ArticlesController} from "./articles.controller";
import {CategoriesController} from "./categories.controller";
import {SearchController} from "./search.controller";
import {
  articlesServiceFactory,
  categoriesServiceFactory,
  commentsServiceFactory,
  searchServiceFactory,
} from "../services/data-service";
import {ICategoryModel} from "../data-access/models/category";
import {IArticleModel} from "../data-access/models/article";
import {ICommentModel} from "../data-access/models/comment";

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
