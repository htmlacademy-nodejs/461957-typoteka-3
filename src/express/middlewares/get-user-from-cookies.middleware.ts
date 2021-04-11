import {NextFunction, Request} from "express";
import {getAuthTokenFromCookies, invalidateAuthCookie, setAuthCookie} from "../helpers/cookie.helper";
import {IAuthTokens} from "../../types/interfaces/auth-tokens";
import {dataProviderService} from "../services";
import {IUserPreview} from "../../types/interfaces/user-preview";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {getLogger} from "../logger";

const logger = getLogger();

export async function getUserFromCookiesMiddleware(
  req: Request,
  res: IResponseExtended,
  next: NextFunction,
): Promise<void> {
  const tokens = getAuthTokenFromCookies(req);
  if (!tokens) {
    next();
    return;
  }
  let {accessToken, refreshToken} = splitTokens(tokens);
  let user: IUserPreview = null;

  try {
    user = await dataProviderService.getUserFromToken(accessToken);
  } catch {
    logger.info(`Access token is invalid, requesting new tokens`);
    try {
      ({accessToken, refreshToken} = await refreshTokens(refreshToken));
      setAuthCookie(res, {accessToken, refreshToken});
      user = await dataProviderService.getUserFromToken(accessToken);
    } catch (e) {
      invalidateAuthCookie(res);
      logger.error(`Failed to authenticate the user: \n${(e as unknown).toString()}`);
    }
  }
  res.locals.currentUser = user;
  next();
}

function splitTokens(tokens: string): IAuthTokens {
  return JSON.parse(tokens) as IAuthTokens;
}

async function refreshTokens(refreshToken: string): Promise<IAuthTokens> {
  try {
    const {accessToken, refreshToken: newRefreshToken} = await dataProviderService.refreshTokens(refreshToken);
    return {accessToken, refreshToken: newRefreshToken};
  } catch (e) {
    return Promise.reject(`Failed to refresh tokens: \n${(e as unknown).toString()}`);
  }
}
