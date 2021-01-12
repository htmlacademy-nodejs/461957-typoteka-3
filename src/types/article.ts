import type {ArticleComment} from "./article-comment";
import {CategoryId} from "./category-id";

export interface NewArticle {
  title: string;
  createdDate: Date;
  announce: string;
  fullText?: string;
  category: CategoryId[];
}

export interface Article extends NewArticle {
  id: string;
  comments: ArticleComment[];
}
