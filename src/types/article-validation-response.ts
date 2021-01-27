import {IArticleId, NewArticle} from "./article";

export type ArticleValidationResponse = Partial<Record<keyof (NewArticle & IArticleId), string>>;
