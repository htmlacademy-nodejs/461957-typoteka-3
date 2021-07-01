import {Article, NewArticle} from "../../../../types/article";
import {Category} from "../../../../types/category";
import {ArticleComment} from "../../../../types/article-comment";

const ArticleProperty: Record<Uppercase<keyof Article>, string> & Record<Uppercase<keyof NewArticle>, string> = {
  COMMENTS: `comments`,
  CATEGORIES: `categories`,
  ANNOUNCE: `announce`,
  ID: `id`,
  CREATEDDATE: `created_date`,
  FULLTEXT: `full_text`,
  TITLE: `title`,
  AUTHORID: `author_id`,
};

const CategoryProperty: Record<Uppercase<keyof Category>, string> = {
  ID: `id`,
  LABEL: `label`,
};

const ArticleCategoryProperty = {
  ARTICLE: {
    singular: `article`,
    plural: `articles`,
  },
  CATEGORY: {
    singular: `category`,
    plural: `categories`,
  },
};

const CommentProperty: Partial<Record<Uppercase<keyof ArticleComment>, string>> = {
  ID: `id`,
  CREATEDDATE: `created_date`,
  ARTICLEID: `article_id`,
  TEXT: `text`,
  AUTHORID: `author_id`,
};

const UserProperty = {
  ID: `id`,
  EMAIL: `email`,
  FIRST_NAME: `first_name`,
  LAST_NAME: `last_name`,
  AVATAR: `avatar`,
  ROLE_ID: `role_id`,
  PASSWORD: `password`,
};

const RefreshTokenProperty = {
  TOKEN: `token`,
  USER_ID: `userId`,
} as const;

export {
  ArticleCategoryProperty,
  ArticleProperty,
  CategoryProperty,
  CommentProperty,
  RefreshTokenProperty,
  UserProperty,
};
