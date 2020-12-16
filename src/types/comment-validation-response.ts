import type {ArticleComment} from "./article-comment";
import type {ValidationMessage} from "./validation-message";

export type CommentValidationResponse = Partial<Record<keyof ArticleComment, ValidationMessage>>;
