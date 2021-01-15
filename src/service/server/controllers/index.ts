import {ArticlesController} from "./articles.controller";
import {CategoriesController} from "./categories.controller";
import {SearchController} from "./search.controller";
import {DataProviderService} from "../services/data-provider.service";
import {categoriesServiceFactory, searchServiceFactory} from "../services/data-service";
import {ICategoryModel} from "../data-access/models/category";
import {IIntermediateModel} from "../data-access/models/intermediate";
import {IArticleModel} from "../data-access/models/article";

export const articlesControllerFactory = (dataProviderService: DataProviderService): ArticlesController =>
  new ArticlesController(dataProviderService);

export const categoriesControllerFactory = (
  CategoryModel: ICategoryModel,
  ArticleCategoryModel: IIntermediateModel,
): CategoriesController => new CategoriesController(categoriesServiceFactory(CategoryModel, ArticleCategoryModel));

export const searchControllerFactory = (ArticleModel: IArticleModel): SearchController =>
  new SearchController(searchServiceFactory(ArticleModel));
