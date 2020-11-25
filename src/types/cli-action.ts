import {ServiceCliCommandName} from "./service-cli-command-name";

export interface CliAction {
  name: ServiceCliCommandName,
  run: () => Promise<void> | void
}
