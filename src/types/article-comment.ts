import {ArticleId} from "./article-id";

export interface ArticleComment {
  id: string;
  text: string;
  articleId: ArticleId;
  createdDate: Date;
}
