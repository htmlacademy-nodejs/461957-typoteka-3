import type {Article} from "./article";
import type {ValidationMessage} from "./validation-message";

export type ArticleValidationResponse = Partial<Record<keyof Article, ValidationMessage>>;
