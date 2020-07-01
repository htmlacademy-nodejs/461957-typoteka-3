import {Article} from "./article";
import {ValidationError} from "../service/errors/validation-error";

export type ArticleValidationResponse = {
  [key in keyof Article]?: ValidationError;
}
