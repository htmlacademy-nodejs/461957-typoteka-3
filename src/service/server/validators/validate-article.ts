import {ValidationError} from "joi";

import {IArticleCreating} from "../../../types/interfaces/article-creating";
import {getLogger} from "../../logger";

import {getValidationDictionary} from "./get-validation-dictionary";
import {newArticleSchema} from "./schemas";

async function validateNewArticle(newArticle: IArticleCreating): Promise<IArticleCreating> {
  const logger = getLogger();
  try {
    return (await newArticleSchema.validateAsync(newArticle, {abortEarly: false})) as IArticleCreating;
  } catch (e) {
    if (e instanceof ValidationError) {
      logger.debug(`Failed to validate the article`);
      throw getValidationDictionary<IArticleCreating>(e.details);
    }
    logger.debug(`Unknown error during validating the article`);
    throw e;
  }
}

export {
  validateNewArticle,
};
