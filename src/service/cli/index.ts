import {cliAction as generate} from "./generate";
import {cliAction as fill} from "./generate-database-mock";
import {cliAction as server} from "./server";
import {cliAction as help} from "./help";
import {cliAction as version} from "./version";
import {ServiceCliCommandName} from "../../types/service-cli-command-name";
import {CliAction} from "../../types/cli-action";

export const Cli: Partial<Record<ServiceCliCommandName, CliAction>> = {
  [help.name]: help,
  [version.name]: version,
  [generate.name]: generate,
  [server.name]: server,
  [fill.name]: fill,
};
