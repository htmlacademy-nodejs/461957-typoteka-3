import {sign} from "jsonwebtoken";

import {ENV} from "../../../shared/env/env";
import {IAuthTokens} from "../../../types/interfaces/auth-tokens";
import {IUserPreview} from "../../../types/interfaces/user-preview";

function makeAuthTokens(tokenData: IUserPreview): IAuthTokens {
  const accessToken = sign(tokenData, ENV.JWT_ACCESS_SECRET, {expiresIn: ENV.JWT_ACCESS_EXPIRATION});
  const refreshToken = sign(tokenData, ENV.JWT_REFRESH_SECRET, {expiresIn: ENV.JWT_REFRESH_EXPIRATION});
  return {accessToken, refreshToken};
}

export {
  makeAuthTokens,
};
