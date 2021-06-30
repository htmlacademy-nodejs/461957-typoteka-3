import {CommentValidationResponse} from "../../../types/comment-validation-response";
import {CommentFormValidation} from "../../../types/form-fields/comment-form-validation";

function commentValidationResponseMapper(
  commentValidationResponse: CommentValidationResponse,
): CommentFormValidation {
  return Object.fromEntries(
    Object.entries({
      TEXT: commentValidationResponse.text,
    }).filter(([, value]) => !!value),
  );
}

export {
  commentValidationResponseMapper,
};
