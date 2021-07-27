import {promises} from "fs";

import chalk from "chalk";

async function truncateFile(filePath: string): Promise<void> {
  try {
    const isFileExists = await promises.access(filePath).then(() => true).catch(() => false);
    if (isFileExists) {
      await promises.truncate(filePath);
      console.log(chalk.white(`File cleared: ${filePath}`));
    } else {
      console.log(chalk.white(`File does not exist: ${filePath}`));
    }
  } catch (e) {
    console.error(chalk.red(`Unable to clear file ${filePath}`));
    console.error(chalk.red(e));
  }
}

export {
  truncateFile,
};
