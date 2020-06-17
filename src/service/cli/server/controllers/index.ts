import {dataProviderService} from "../services/data-provider.service";
import {ArticlesController} from "./articles.controller";
import {CategoriesController} from "./categories.controller";
import {SearchController} from "./search.controller";

export const articlesController = new ArticlesController(dataProviderService);
export const categoriesController = new CategoriesController(
  dataProviderService,
);
export const searchController = new SearchController(dataProviderService);
