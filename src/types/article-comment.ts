import {ICommentCreating} from "./interfaces/comment-creating";
import {ICommentId} from "./interfaces/comment-id";

export interface ArticleComment extends ICommentCreating, ICommentId {}

export type CommentId = number;
