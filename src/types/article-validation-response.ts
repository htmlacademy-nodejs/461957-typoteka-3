import {IArticleId} from "./article";
import {IArticleCreating} from "./interfaces/article-creating";

export type ArticleValidationResponse = Partial<Record<keyof (IArticleCreating & IArticleId), string>>;
