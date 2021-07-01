import {IArticleId} from "./article";
import {IArticleCreating} from "./interfaces/article-creating";
import {ValidationResponse} from "./validation-response";

type ArticleValidationResponse = ValidationResponse<IArticleCreating & IArticleId>;

export {
  ArticleValidationResponse,
};
