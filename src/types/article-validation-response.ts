import {Article} from "./article";
import {ValidationError} from "../service/errors/validation-error";

export type ArticleValidationResponse = Partial<Record<keyof Article, {state: ValidationError; message?: string}>>;
