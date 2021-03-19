import {sign} from "jsonwebtoken";
import {ENV} from "../../../shared/env/env";
import {IUserPreview} from "../../../types/interfaces/user-preview";
import {IAuthTokens} from "../../../types/interfaces/auth-tokens";

export function makeAuthTokens(tokenData: IUserPreview): IAuthTokens {
  const accessToken = sign(tokenData, ENV.JWT_ACCESS_SECRET, {expiresIn: `10m`});
  const refreshToken = sign(tokenData, ENV.JWT_REFRESH_SECRET);
  return {accessToken, refreshToken};
}
