import {promises} from "fs";
import chalk from "chalk";

export async function truncateFile(filePath: string): Promise<void> {
  try {
    await promises.truncate(filePath);
    console.log(chalk.white(`File cleared: ${filePath}`));
  } catch (e) {
    console.error(chalk.red(`Unable to clear file ${filePath}`));
    console.error(chalk.red(e));
  }
}
