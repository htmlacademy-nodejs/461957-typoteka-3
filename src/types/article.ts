import {ArticleComment} from "./article-comment";

export interface Article {
  id: string,
  title: string,
  createdDate: Date,
  announce: string,
  fullText: string,
  category: string[],
  comments: ArticleComment[];
}
