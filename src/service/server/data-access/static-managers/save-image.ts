import {join} from "path";
import {writeFile} from "fs/promises";

import {getLogger} from "../../../logger";

import {resolveStaticFolderPath} from "./resolve-static-folder-path";

const logger = getLogger();

async function saveImage(name: string, content: Buffer): Promise<void> {
  const filePath = join(resolveStaticFolderPath(), name);
  try {
    await writeFile(filePath, content);
    logger.info(`Picture successful saved to ${filePath}`);
  } catch (e) {
    logger.error(`Failed to save picture to ${filePath}`);
    logger.error(e);
  }
}

export {saveImage};
