export const DEFAULT_PORT = 3000;
export const MOCK_FILE_PATH = `mocks.json`;
export const DEFAULT_SSR_PORT = 8080;
export const STATIC_DIR = `static`;
export const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
export const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};
export const MS_IN_DAY = 86400000;
export const MS_IN_HOUR = 3600000;
export const MS_IN_MINUTE = 60000;
export const MINUTES_IN_HOUR = 60;
export const DAYS_IN_WEEK = 7;
export const DAYS_IN_MONTH = 30;
export const MockTextsFilePath = {
  SENTENCES: `./data/sentences.txt`,
  CATEGORIES: `./data/categories.txt`,
  TITLES: `./data/titles.txt`,
  COMMENTS: `./data/comments.txt`,
};
export const Routes = {
  API: `/api`,
  ARTICLES: `/articles`,
  COMMENTS: `/comments`,
  CATEGORIES: `/categories`,
  SEARCH: `/search`,
};
export const ClientRoutes = {
  ADMIN: {
    INDEX: `/my`,
    COMMENTS: `/my/comments`,
  },
  ARTICLES: {
    INDEX: `/articles`,
    ADD: `/articles/add`,
  },
};
export const HttpMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
} as const;
export const ARTICLE_FORM_FIELDS = {
  createdDate: {
    name: `date`,
    label: `Дата`,
  },
  category: {
    name: `category`,
    label: `Категории`,
  },
  title: {
    name: `title`,
    label: `Заголовок`,
  },
  announce: {
    name: `announce`,
    label: `Анонс публикации`,
  },
  fullText: {
    name: `fullText`,
    label: `Полный текст публикации`,
  },
  Image: {
    name: `image`,
    label: ``,
  },
} as const;
