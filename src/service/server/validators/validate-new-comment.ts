import {newCommentSchema} from "./schemas";
import {ValidationError} from "joi";
import {ICommentCreating} from "../../../types/interfaces/comment-creating";
import {getValidationDictionary} from "./get-validation-dictionary";

export async function validateNewComment(newComment: ICommentCreating): Promise<ICommentCreating> {
  try {
    return (await newCommentSchema.validateAsync(newComment, {abortEarly: false})) as ICommentCreating;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw getValidationDictionary<ICommentCreating>(e.details);
    }
    throw e;
  }
}
