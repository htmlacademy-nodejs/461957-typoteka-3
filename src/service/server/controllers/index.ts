import {ArticlesController} from "./articles.controller";
import {CategoriesController} from "./categories.controller";
import {SearchController} from "./search.controller";
import {DataProviderService} from "../services/data-provider.service";

export const articlesControllerFabric = (dataProviderService: DataProviderService): ArticlesController =>
  new ArticlesController(dataProviderService);
export const categoriesControllerFabric = (dataProviderService: DataProviderService): CategoriesController =>
  new CategoriesController(dataProviderService);
export const searchControllerFabric = (dataProviderService: DataProviderService): SearchController =>
  new SearchController(dataProviderService);
