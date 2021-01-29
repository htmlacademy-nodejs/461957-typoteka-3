import {ICommentCreating} from "./interfaces/comment-creating";
import {ICommentId} from "./interfaces/comment-id";
import {ArticleId} from "./article-id";

export interface NewArticleComment {
  text: string;
  articleId: ArticleId;
  createdDate: Date;
}

export interface ArticleComment extends ICommentCreating, ICommentId {}

export type CommentId = number;
