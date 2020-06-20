import {cliAction as generate} from "./generate";
const help = require(`./help`);
const version = require(`./version`);
const server = require(`./server`);

const Cli = {
  [help.name]: help,
  [version.name]: version,
  [generate.name]: generate,
  [server.name]: server,
};

export = Cli;
