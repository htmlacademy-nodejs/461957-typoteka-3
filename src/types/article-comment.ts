import {ICommentCreating} from "./interfaces/comment-creating";
import {ICommentId} from "./interfaces/comment-id";

interface ArticleComment extends ICommentCreating, ICommentId {}

type CommentId = number;

export {
  ArticleComment,
  CommentId,
};
