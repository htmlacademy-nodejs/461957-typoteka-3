import {newArticleSchema} from "./schemas";
import {ValidationError} from "joi";
import {IArticleCreating} from "../../../types/interfaces/article-creating";
import {getValidationDictionary} from "./get-validation-dictionary";

export async function validateNewArticle(newArticle: IArticleCreating): Promise<IArticleCreating> {
  try {
    return (await newArticleSchema.validateAsync(newArticle, {abortEarly: false})) as IArticleCreating;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw getValidationDictionary<IArticleCreating>(e.details);
    }
    throw e;
  }
}
