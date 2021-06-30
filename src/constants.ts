const DEFAULT_PORT = 3000;
const MockFilePath = {
  ARTICLES: `mocks/articles.json`,
  CATEGORIES: `mocks/categories.json`,
  FILL_DATABASE_SQL_SCRIPT: `mocks/fill-db.sql`,
} as const;
const DEFAULT_SSR_PORT = 8080;
const STATIC_DIR = `static`;
const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};
const Time = {
  MS_IN_DAY: 86400000,
  MS_IN_HOUR: 3600000,
  MS_IN_MINUTE: 60000,
  MINUTES_IN_HOUR: 60,
  DAYS_IN_WEEK: 7,
  DAYS_IN_MONTH: 30,
} as const;
const MockTextsFilePath = {
  SENTENCES: `data/sentences.txt`,
  CATEGORIES: `data/categories.txt`,
  TITLES: `data/titles.txt`,
  COMMENTS: `data/comments.txt`,
  PERMISSIONS: `data/permissions.txt`,
  FIRST_NAMES: `data/first-names.txt`,
  LAST_NAMES: `data/last-names.txt`,
  EMAILS: `data/emails.txt`,
  AVATARS: `data/avatars.txt`,
} as const;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const LogLevel = {
  FATAL: `fatal`,
  ERROR: `error`,
  WARN: `warn`,
  INFO: `info`,
  DEBUG: `debug`,
  TRACE: `trace`,
} as const;
const PAGE_SIZE = 8;
const PAGE_QUERY_PARAM = `page`;
const LoginStatus = {
  UNKNOWN_EMAIL: `unknownEmail`,
  INVALID_PASSWORD: `invalidPassword`,
  SUCCESS: `success`,
} as const;

export {
  DEFAULT_COMMAND,
  DEFAULT_PORT,
  DEFAULT_SSR_PORT,
  ExitCode,
  HttpCode,
  LogLevel,
  LoginStatus,
  MockFilePath,
  MockTextsFilePath,
  PAGE_QUERY_PARAM,
  PAGE_SIZE,
  STATIC_DIR,
  Time,
  USER_ARGV_INDEX,
};
