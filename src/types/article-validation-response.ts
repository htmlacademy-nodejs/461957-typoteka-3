import {IArticleId, NewArticle} from "./article";
import type {ValidationMessage} from "./validation-message";

export type ArticleValidationResponse = Partial<Record<keyof (NewArticle & IArticleId), ValidationMessage>>;
