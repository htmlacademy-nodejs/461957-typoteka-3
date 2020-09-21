import {ArticleComment} from "./article-comment";
import {ValidationMessage} from "./validation-message";

export type CommentValidationResponse = Partial<Record<keyof ArticleComment, ValidationMessage>>;
