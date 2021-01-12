import {ArticleId} from "./article-id";

export interface NewArticleComment {
  text: string;
  articleId: ArticleId;
  createdDate: Date;
}

export interface ArticleComment extends NewArticleComment {
  id: string;
}
