import {ArticleComment} from "./article-comment";
import {ValidationError} from "../service/errors/validation-error";

export type CommentValidationResponse = Partial<
  Record<keyof ArticleComment, {state: ValidationError; message?: string}>
>;
