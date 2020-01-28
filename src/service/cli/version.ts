import {IPackageJson} from "package-json-type";
import {CliAction} from "../../types/cli-action";
const chalk = require(`chalk`);

const packageJsonFile: IPackageJson = require(`../../../package.json`);
const version: string = packageJsonFile.version;

const cliAction: CliAction = {
  name: `--version`,
  run() {
    console.info(chalk.blue(version));
  }
};

export = cliAction;
