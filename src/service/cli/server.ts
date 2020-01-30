import {CliAction} from "../../types/cli-action";
import {Article} from "../../types/article";
const {DEFAULT_PORT, ContentType, HttpCode} = require(`../../constants`);
const fs = require(`fs`).promises;
const http = require(`http`);
const chalk = require(`chalk`);
const notFoundMessageText = `404: Not Found`;
const MOCKS_FILE_PATH = `./mocks.json`;

function getTemplate(message: string): string {
  return `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();
}

function sendResponse(res, statusCode: number, message: string): void {
  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-type': ContentType.HTML,
  });
  res.end(getTemplate(message));
}

async function onClientConnect(req, res) {
  switch (req.url) {
    case `/`:
      try {
        const rawContent = await fs.readFile(MOCKS_FILE_PATH, `utf8`);
        const titles = (JSON.parse(rawContent) as Article[])
          .map((article) => `<li>${article.title}</li>`)
          .join(``);
        sendResponse(res, HttpCode.OK, `<ul>${titles}</ul>`);
      } catch (e) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
}

const cliAction: CliAction = {
  name: `--server`,
  run(args?) {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(chalk.red(`Error on create http-server.`, err));
        }
        return console.log(chalk.green(`Listen on port ${port}`));
      });
  },
};

export = cliAction;
