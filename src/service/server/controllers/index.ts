import {ArticlesController} from "./articles.controller";
import {CategoriesController} from "./categories.controller";
import {SearchController} from "./search.controller";
import {DataProviderService} from "../services/data-provider.service";
import {articlesServiceFactory, categoriesServiceFactory, searchServiceFactory} from "../services/data-service";
import {ICategoryModel} from "../data-access/models/category";
import {IIntermediateModel} from "../data-access/models/intermediate";
import {IArticleModel} from "../data-access/models/article";

export const articlesControllerFactory = ({
  ArticleModel,
  ArticleCategoryModel,
  CategoryModel,
  dataProviderService,
}: {
  ArticleModel: IArticleModel;
  ArticleCategoryModel: IIntermediateModel;
  CategoryModel: ICategoryModel;
  dataProviderService: DataProviderService;
}): ArticlesController =>
  new ArticlesController(
    articlesServiceFactory(ArticleModel, ArticleCategoryModel),
    categoriesServiceFactory(CategoryModel, ArticleCategoryModel),
    dataProviderService,
  );

export const categoriesControllerFactory = ({
  CategoryModel,
  ArticleCategoryModel,
}: {
  CategoryModel: ICategoryModel;
  ArticleCategoryModel: IIntermediateModel;
}): CategoriesController => new CategoriesController(categoriesServiceFactory(CategoryModel, ArticleCategoryModel));

export const searchControllerFactory = ({ArticleModel}: {ArticleModel: IArticleModel}): SearchController =>
  new SearchController(searchServiceFactory(ArticleModel));
