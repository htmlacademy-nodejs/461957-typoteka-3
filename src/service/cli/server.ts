import {CliAction} from "../../types/cli-action";
import {runServer} from "../server";

export const cliAction: CliAction = {
  name: `--server`,
  run: runServer,
};
