import {newArticleSchema} from "./schemas";
import {ValidationError, ValidationErrorItem} from "joi";
import {ArticleValidationResponse} from "../../../types/article-validation-response";
import {IArticleCreating} from "../../../types/interfaces/article-creating";

export async function validateNewArticle(newArticle: IArticleCreating): Promise<IArticleCreating> {
  try {
    return (await newArticleSchema.validateAsync(newArticle, {abortEarly: false})) as IArticleCreating;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw getValidationDictionary(e.details);
    } else {
      throw e;
    }
  }
}

function getValidationDictionary(errors: ValidationErrorItem[]): ArticleValidationResponse {
  const collection = errors.map(item => ({[item.context.key]: item.message}));
  return Object.assign({}, ...collection) as Record<string, string>;
}
