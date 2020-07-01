import {ArticleComment} from "./article-comment";
import {ValidationError} from "../service/errors/validation-error";

export type CommentValidationResponse = {
  [key in keyof ArticleComment]?: ValidationError;
}
