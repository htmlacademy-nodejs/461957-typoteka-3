import {NextFunction, Request, Response} from "express";
import {HttpCode} from "../../constants-es6";
import {ValidationError} from "../../shared/errors/validation-error";
import {CommentValidationResponse} from "../../types/comment-validation-response";
import {ArticleComment} from "../../types/article-comment";

export function newCommentValidator(req: Request, res: Response, next: NextFunction): void {
  const commentValidationResponse = getCommentValidationResponse(req.body);
  if (!commentValidationResponse) {
    next();
  } else {
    res.status(HttpCode.BAD_REQUEST).send(commentValidationResponse);
  }
}

function getCommentValidationResponse(comment: Partial<ArticleComment>): CommentValidationResponse {
  const validationResponse: CommentValidationResponse = {};

  if (!comment.text) {
    validationResponse.text = {state: ValidationError.REQUIRED};
  }

  if (Object.keys(validationResponse).length) {
    return validationResponse;
  }
  return null;
}
