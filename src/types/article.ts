import type {ArticleComment, CommentId} from "./article-comment";
import {ArticleId} from "./article-id";
import {Category, ICategoryId} from "./category";
import {CategoryWithLink} from "./category-with-link";
import {CategoryWithLinksAndNumbers} from "./category-with-links-and-numbers";
import {IAuthorId} from "./interfaces/author-id";

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

export interface ICategoriesIds {
  categories: ICategoryId[];
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

export interface ILink {
  link: string;
}

export interface ICategoriesWithLinks {
  categories: CategoryWithLink[];
}

export interface ICsrf {
  _csrf: string;
}

export interface ICategoriesWithLinksAndNumbers {
  categories: CategoryWithLinksAndNumbers[];
}

export interface NewArticle extends ITitle, ICreatedDate, IAnnounce, IFullText, ICategories, IAuthorId {}

export interface Article extends Omit<NewArticle, `authorId`>, IArticleId {
  comments: ArticleComment[];
}
