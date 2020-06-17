import {dataProviderService} from "../services/data-provider.service";
import {ArticlesController} from "./articles.controller";

export const articlesController = new ArticlesController(dataProviderService);
