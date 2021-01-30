import {IArticleId} from "./article";
import {IArticleCreating} from "./interfaces/article-creating";
import {ValidationResponse} from "./validation-response";

export type ArticleValidationResponse = ValidationResponse<IArticleCreating & IArticleId>;
