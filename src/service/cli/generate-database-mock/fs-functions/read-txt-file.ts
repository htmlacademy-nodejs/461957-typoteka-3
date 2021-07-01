import {promises} from "fs";

import chalk from "chalk";

async function readTXTFile(filePath: string): Promise<string[]> {
  try {
    const rawContent: string = await promises.readFile(filePath, `utf8`);
    console.log(chalk.white(`Read successfully: ${filePath}`));
    return rawContent
      .replace(/(\r\n)/gm, `\n`)
      .replace(/(\r)/gm, `\n`)
      .split(`\n`)
      .filter(item => !!item.length);
  } catch (e) {
    console.error(chalk.red(`Unable to read file ${filePath}`));
    console.error(chalk.red(e));
    return [];
  }
}

export {
  readTXTFile,
};
