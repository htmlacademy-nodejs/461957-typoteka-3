import {CliAction} from "../../types/cli-action";

const runServer = require(`./server/index`);

const cliAction: CliAction = {
  name: `--server`,
  run: runServer,
};

export = cliAction;
