import {ValidationError} from "joi";

import {ICommentCreating} from "../../../types/interfaces/comment-creating";
import {getLogger} from "../../logger";

import {getValidationDictionary} from "./get-validation-dictionary";
import {newCommentSchema} from "./schemas";

async function validateNewComment(newComment: ICommentCreating): Promise<ICommentCreating> {
  const logger = getLogger();
  try {
    return (await newCommentSchema.validateAsync(newComment, {abortEarly: false})) as ICommentCreating;
  } catch (e) {
    if (e instanceof ValidationError) {
      logger.debug(`Failed to validate the new comment`);
      throw getValidationDictionary<ICommentCreating>(e.details);
    }
    logger.debug(`Unknown error during validating the new coment`);
    throw e;
  }
}

export {
  validateNewComment,
};
