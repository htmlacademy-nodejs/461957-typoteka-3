export const DEFAULT_PORT = 3000;
export const MockFilePath = {
  ARTICLES: `mocks/articles.json`,
  CATEGORIES: `mocks/categories.json`,
  FILL_DATABASE_SQL_SCRIPT: `mocks/fill-db.sql`,
} as const;
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
  SENTENCES: `data/sentences.txt`,
  CATEGORIES: `data/categories.txt`,
  TITLES: `data/titles.txt`,
  COMMENTS: `data/comments.txt`,
  PERMISSIONS: `data/permissions.txt`,
  FIRST_NAMES: `data/first-names.txt`,
  LAST_NAMES: `data/last-names.txt`,
  EMAILS: `data/emails.txt`,
} as const;
export const APIRoutes = {
  API: `/api`,
  ARTICLES: `/articles`,
  ARTICLES_BY_AUTHOR: `/articles/author`,
  EDIT_ARTICLE: `/articles`,
  COMMENTS: `/comments`,
  CATEGORIES: `/categories`,
  CATEGORIES_STATISTICS: `/categories-statistics`,
  SEARCH: `/search`,
  USERS: `/users`,
  AUTH: `/auth`,
  LOGIN: `/auth/login`,
  GET_USER: `/auth/get-user`,
  REFRESH_TOKENS: `/auth/refresh`,
  LOGOUT: `/auth/sign-out`,
};
export const ClientRoutes = {
  INDEX: `/`,
  ADMIN: {
    INDEX: `/my`,
    COMMENTS: `/comments`,
  },
  ARTICLES: {
    INDEX: `/articles`,
    ADD: `/articles/add`,
    CATEGORY: `/articles/category`,
    EDIT: `/articles/edit`,
  },
  SEARCH: {
    INDEX: `/search`,
  },
  REGISTRATION: `/register`,
  SIGN_IN: `/login`,
  CATEGORIES: `/categories`,
  COMMENTS: `/comments`,
  SIGN_OUT: `/sign-out`,
};
export const ARTICLE_FORM_FIELDS = {
  createdDate: {
    name: `createdDate`,
    label: `Дата`,
  },
  categories: {
    name: `categories`,
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
    label: `Фотография`,
  },
  Upload: {
    name: `upload`,
    label: `Фотография`,
  },
} as const;
export const NEW_USER_FORM_FIELDS = {
  email: {
    name: `email`,
    label: `Электронная почта`,
  },
  password: {
    name: `password`,
    label: `Пароль`,
  },
  passwordRepeated: {
    name: `passwordRepeated`,
    label: `Повтор пароля`,
  },
  firstName: {
    name: `firstName`,
    label: `Имя`,
  },
  lastName: {
    name: `lastName`,
    label: `Фамилия`,
  },
  avatar: {
    name: `avatar`,
    label: `Фото профиля`,
  },
} as const;
export const COMMENT_FORM_FIELDS = {
  text: {
    name: `text`,
    label: `Сообщение`,
  },
};
export const TableNames = {
  USERS: `users`,
  PERMISSIONS: `permissions`,
  ARTICLES: `articles`,
  CATEGORIES: `categories`,
  ARTICLES_CATEGORIES: `articles_categories`,
  COMMENTS: `comments`,
} as const;
export const DEFAULT_COMMAND = `--help`;
export const USER_ARGV_INDEX = 2;
export const LogLevel = {
  FATAL: `fatal`,
  ERROR: `error`,
  WARN: `warn`,
  INFO: `info`,
  DEBUG: `debug`,
  TRACE: `trace`,
} as const;
export const PAGE_SIZE = 8;
export const PAGE_QUERY_PARAM = `page`;
export const LoginStatus = {
  UNKNOWN_EMAIL: `unknownEmail`,
  INVALID_PASSWORD: `invalidPassword`,
  SUCCESS: `success`,
} as const;
