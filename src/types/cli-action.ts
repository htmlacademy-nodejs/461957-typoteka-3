import {ServiceCliCommandName} from "./service-cli-command-name";

export interface CliAction {
  name: ServiceCliCommandName,
  run: (args?: any) => Promise<void> | void
}
