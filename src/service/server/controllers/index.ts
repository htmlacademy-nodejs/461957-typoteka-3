import {ArticlesController} from "./articles.controller";
import {CategoriesController} from "./categories.controller";
import {SearchController} from "./search.controller";
import {DataProviderService} from "../services/data-provider.service";
import {categoriesFactory} from "../services/data-service";
import {ICategoryModel} from "../data-access/models/category";

export const articlesControllerFabric = (dataProviderService: DataProviderService): ArticlesController =>
  new ArticlesController(dataProviderService);
export const categoriesControllerFabric = (
  dataProviderService: DataProviderService,
  CategoryModel: ICategoryModel,
): CategoriesController => new CategoriesController(categoriesFactory(CategoryModel));
export const searchControllerFabric = (dataProviderService: DataProviderService): SearchController =>
  new SearchController(dataProviderService);
