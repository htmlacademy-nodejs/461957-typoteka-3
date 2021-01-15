import {ArticlesController} from "./articles.controller";
import {CategoriesController} from "./categories.controller";
import {SearchController} from "./search.controller";
import {DataProviderService} from "../services/data-provider.service";
import {categoriesFactory} from "../services/data-service";
import {ICategoryModel} from "../data-access/models/category";
import {IIntermediateModel} from "../data-access/models/intermediate";

export const articlesControllerFactory = (dataProviderService: DataProviderService): ArticlesController =>
  new ArticlesController(dataProviderService);

export const categoriesControllerFactory = (
  CategoryModel: ICategoryModel,
  ArticleCategoryModel: IIntermediateModel,
): CategoriesController => new CategoriesController(categoriesFactory(CategoryModel, ArticleCategoryModel));

export const searchControllerFactory = (dataProviderService: DataProviderService): SearchController =>
  new SearchController(dataProviderService);
