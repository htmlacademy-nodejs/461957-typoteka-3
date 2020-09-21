import {Article} from "./article";
import {ValidationMessage} from "./validation-message";

export type ArticleValidationResponse = Partial<Record<keyof Article, ValidationMessage>>;
