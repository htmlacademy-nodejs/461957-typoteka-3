import {ICommentCreating} from "./interfaces/comment-creating";
import {ValidationResponse} from "./validation-response";

type CommentValidationResponse = ValidationResponse<ICommentCreating>;

export {
  CommentValidationResponse,
};
