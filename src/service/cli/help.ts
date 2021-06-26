import chalk from "chalk";

import {CliAction} from "../../types/cli-action";

export const cliAction: CliAction = {
  name: `--help`,
  run() {
    console.log(
      chalk.gray(`Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>

    Команды:
    --version                  выводит номер версии
    --help                     печатает этот текст
    --fill <count>             формирует SQL-скоманды для наполнения базы данных
    --fill-db <count>          наполняет базу даных моковыми данными
    `),
    );
  },
};
