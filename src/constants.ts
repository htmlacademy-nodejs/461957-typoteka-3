const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const DEFAULT_PORT = 3000;
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

export = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  DEFAULT_PORT,
  ExitCode,
  HttpCode,
  ContentType,
};
