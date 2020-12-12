import {Cli} from "./cli";
import {DEFAULT_COMMAND, ExitCode, USER_ARGV_INDEX} from "../constants-es6";
import {ServiceCliCommandName} from "../types/service-cli-command-name";

const userArguments: string[] = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  void Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}

void Cli[userCommand as ServiceCliCommandName].run(userArguments.slice(1));