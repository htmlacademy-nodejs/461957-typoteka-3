import {CliAction} from "../../types/cli-action";
import {ServiceCliCommandName} from "../../types/service-cli-command-name";
import {cliAction as fillDb} from "./fill-db";

import {cliAction as fill} from "./generate-database-mock";
import {cliAction as help} from "./help";
import {cliAction as server} from "./server";
import {cliAction as version} from "./version";

export const Cli: Partial<Record<ServiceCliCommandName, CliAction>> = {
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
  [fill.name]: fill,
  [fillDb.name]: fillDb,
};
