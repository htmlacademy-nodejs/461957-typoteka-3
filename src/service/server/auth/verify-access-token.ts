import {verify} from "jsonwebtoken";

import {HttpCode} from "../../../constants";
import {ENV} from "../../../shared/env/env";
import {IUserPreview} from "../../../types/interfaces/user-preview";
import {getLogger} from "../../logger";

const logger = getLogger();

async function verifyAccessToken(authorization?: string): Promise<IUserPreview> {
  if (!authorization) {
    return Promise.reject(HttpCode.UNAUTHORIZED);
  }
  const [, token] = authorization.split(` `);
  if (!token) {
    return Promise.reject(HttpCode.UNAUTHORIZED);
  }
  return new Promise((resolve, reject) => {
    verify(token, ENV.JWT_ACCESS_SECRET, (err, userData) => {
      if (err) {
        logger.error(`Invalid access token:\n${JSON.stringify(err)}`);
        reject(HttpCode.FORBIDDEN);
      }
      resolve(userData as IUserPreview);
    });
  });
}

export {
  verifyAccessToken,
};
