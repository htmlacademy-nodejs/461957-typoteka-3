import {Article} from "../../../../types/article";
import {Category} from "../../../../types/category";
import {ArticleComment} from "../../../../types/article-comment";

export const ArticleProperty: Record<Uppercase<keyof Article>, string> = {
  COMMENTS: `comments`,
  CATEGORIES: `categories`,
  ANNOUNCE: `announce`,
  ID: `id`,
  CREATEDDATE: `created_date`,
  FULLTEXT: `full_text`,
  TITLE: `title`,
  COMMENTSCOUNT: `comments_count`,
};

export const CategoryProperty: Record<Uppercase<keyof Category>, string> = {
  ID: `id`,
  LABEL: `label`,
};

export const ArticleCategoryProperty = {
  ARTICLE: {
    singular: `article`,
    plural: `articles`,
  },
  CATEGORY: {
    singular: `category`,
    plural: `categories`,
  },
};

export const CommentProperty: Record<Uppercase<keyof ArticleComment>, string> = {
  ID: `id`,
  CREATEDDATE: `created_date`,
  ARTICLEID: `article_id`,
  TEXT: `text`,
};
