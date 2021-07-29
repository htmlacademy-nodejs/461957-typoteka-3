import {join} from "path";

import {IMAGES_DIR, SERVER_FOLDER_NAME} from "../../../../constants";

function resolveStaticFolderPath(): string {
  return join(require.main.path, SERVER_FOLDER_NAME, IMAGES_DIR);
}

export {resolveStaticFolderPath};
