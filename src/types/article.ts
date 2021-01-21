import type {ArticleComment, CommentId} from "./article-comment";
import {CategoryId} from "./category-id";
import {ArticleId} from "./article-id";
import {Category} from "./category";

export interface IArticleId {
  id: ArticleId;
}

export interface ITitle {
  title: string;
}

export interface ICreatedDate {
  createdDate: Date;
}

export interface IAnnounce {
  announce: string;
}

export interface IFullText {
  fullText: string;
}

export interface ICategories {
  categories: Category[];
}

export interface ICommentsCount {
  commentsCount: number;
}

export interface ICommentsIds {
  commentsIds: CommentId[];
}

export interface IComments {
  comments: ArticleComment[];
}

export interface NewArticle {
  title: string;
  createdDate: Date;
  announce: string;
  fullText?: string;
  categories: CategoryId[];
}

export interface Article extends NewArticle {
  id: string;
  comments: ArticleComment[];
}

export interface ArticleWithComments extends NewArticle {
  comments: ArticleComment[];
}
