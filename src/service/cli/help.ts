import {CliAction} from "../../types/cli-action";
const chalk = require(`chalk`);

const cliAction: CliAction = {
  name: `--help`,
  run() {
    console.log(chalk.gray(`Программа запускает http-сервер и формирует файл с данными для API.
    
    Гайд:
    server &lt;command&gt;
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate &lt;count&gt;    формирует файл mocks.json
    `));
  }
};

export = cliAction
