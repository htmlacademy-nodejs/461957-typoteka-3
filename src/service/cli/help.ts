import {CliAction} from "../../types/cli-action";
import chalk from "chalk";

export const cliAction: CliAction = {
  name: `--help`,
  run() {
    console.log(chalk.gray(`Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>

    Команды:
    --version                  выводит номер версии
    --help                     печатает этот текст
    --generate <count>         формирует файл mocks.json
    --generate <count> --test  формирует файл mocks.json для E2E тестов
    --fill <count>             формирует SQL-скоманды для наполнения базы данных
    `));
  },
};
