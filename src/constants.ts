/**
  Please use ./constants-es6.ts
*/

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};
const HttpCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
const ContentType = {
  PLAIN: `text/plain; charset=UTF-8`,
  HTML: `text/html; charset=utf-8`,
  CSS: `text/css; charset=utf-8`,
};
const DEFAULT_PORT = 3000;
const SSR_PORT = 8080;
const STATIC_DIR = `src/express/static`;

export = {
  USER_ARGV_INDEX,
  ExitCode,
  SSR_PORT,
  STATIC_DIR,
  DEFAULT_PORT,
  DEFAULT_COMMAND,
  HttpCode,
  ContentType,
};
