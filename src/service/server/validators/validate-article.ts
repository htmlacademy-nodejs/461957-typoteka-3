import {newArticleSchema} from "./schemas";
import {ValidationError} from "joi";
import {IArticleCreating} from "../../../types/interfaces/article-creating";
import {getValidationDictionary} from "./get-validation-dictionary";
import {getLogger} from "../../logger";

export async function validateNewArticle(newArticle: IArticleCreating): Promise<IArticleCreating> {
  const logger = getLogger();
  try {
    return (await newArticleSchema.validateAsync(newArticle, {abortEarly: false})) as IArticleCreating;
  } catch (e) {
    if (e instanceof ValidationError) {
      logger.debug(`Failed to validate article`);
      throw getValidationDictionary<IArticleCreating>(e.details);
    }
    logger.debug(`Unknown error during validating the article`);
    throw e;
  }
}
