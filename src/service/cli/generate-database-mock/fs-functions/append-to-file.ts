import chalk from "chalk";
import {promises} from "fs";

export async function appendToFile(filePath: string, content: string): Promise<void> {
  try {
    await promises.appendFile(filePath, content);
  } catch (e) {
    console.error(chalk.red(`Fail to append to file ${filePath}`));
    console.error(chalk.red(e));
  }
}
