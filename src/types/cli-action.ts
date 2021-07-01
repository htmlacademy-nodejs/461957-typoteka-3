import type {ServiceCliCommandName} from "./service-cli-command-name";

interface CliAction {
  name: ServiceCliCommandName,
  run: (args?: any) => Promise<void> | void
}

export {
  CliAction,
};
