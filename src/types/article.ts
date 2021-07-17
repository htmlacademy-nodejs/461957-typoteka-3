import type {CommentId} from "./article-comment";
import {ArticleId} from "./article-id";
import {Category, ICategoryId} from "./category";
import {CategoryWithLink} from "./category-with-link";
import {CategoryWithLinksAndNumbers} from "./category-with-links-and-numbers";
import {IAuthorId} from "./interfaces/author-id";
import {ICommentPreview} from "./interfaces/comment-preview";
import {IPictureName} from "./interfaces/picture-name";

interface IArticleId {
  id: ArticleId;
}

interface ITitle {
  title: string;
}

interface ICreatedDate {
  createdDate: Date;
}

interface IAnnounce {
  announce: string;
}

interface IFullText {
  fullText: string;
}

interface ICategories {
  categories: Category[];
}

interface ICategoriesIds {
  categories: ICategoryId[];
}

interface ICommentsCount {
  commentsCount: number;
}

interface ICommentsIds {
  commentsIds: CommentId[];
}

interface IComments {
  comments: ICommentPreview[];
}

interface ILink {
  link: string;
}

interface ICategoriesWithLinks {
  categories: CategoryWithLink[];
}

interface ICsrf {
  _csrf: string;
}

interface ICategoriesWithLinksAndNumbers {
  categories: CategoryWithLinksAndNumbers[];
}

interface NewArticle extends ITitle, ICreatedDate, IAnnounce, IFullText, ICategories, IAuthorId {}

interface Article extends Omit<NewArticle, `authorId`>, IArticleId, IPictureName {
  comments: ICommentPreview[];
}

export {
  Article,
  IAnnounce,
  IArticleId,
  ICategories,
  ICategoriesIds,
  ICategoriesWithLinks,
  ICategoriesWithLinksAndNumbers,
  IComments,
  ICommentsCount,
  ICommentsIds,
  ICreatedDate,
  ICsrf,
  IFullText,
  ILink,
  ITitle,
  NewArticle,
};
