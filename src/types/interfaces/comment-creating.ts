import {ICreatedDate} from "../article";
import {ArticleId} from "../article-id";

export interface ICommentCreating extends ICreatedDate {
  text: string;
  articleId: ArticleId;
}
