import {ICreatedDate} from "../article";
import {ArticleId} from "../article-id";
import {IAuthorId} from "./author-id";

export interface ICommentCreating extends ICreatedDate, IAuthorId {
  text: string;
  articleId: ArticleId;
}
