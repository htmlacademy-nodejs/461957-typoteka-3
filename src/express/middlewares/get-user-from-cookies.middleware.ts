import {NextFunction, Request} from "express";
import {getTokenFromCookies, setAuthCookie} from "../helpers/cookie.helper";
import {IAuthTokens} from "../../types/interfaces/auth-tokens";
import {IAccessToken} from "../../types/auth/interfaces/access-token";
import {dataProviderService} from "../services";
import {IUserPreview} from "../../types/interfaces/user-preview";
import {IResponseExtended} from "../../types/interfaces/response-extended";

export async function getUserFromCookiesMiddleware(
  req: Request,
  res: IResponseExtended,
  next: NextFunction,
): Promise<void> {
  const token = getTokenFromCookies(req);
  try {
    const {accessToken, refreshToken} = await checkOrRefreshTokens(token);
    setAuthCookie(res, {accessToken, refreshToken});
    res.locals.currentUser = getUserFromToken(accessToken);
  } catch (e) {
    console.error(`Failed to authenticate the user: \n${(e as unknown).toString()}`);
    res.locals.currentUser = null;
  }
  next();
}

async function checkOrRefreshTokens(tokens: string): Promise<IAuthTokens> {
  if (!tokens) {
    throw new Error(`There aren't any tokens in cookies.`);
  }
  const {accessToken, refreshToken} = JSON.parse(tokens) as IAuthTokens;
  const accessTokenPayload = getPayloadFromToken<IAccessToken>(accessToken);

  let newAccessToken: string;
  let newRefreshToken: string;
  if (isTokenExpired(accessTokenPayload)) {
    ({accessToken: newAccessToken, refreshToken: newRefreshToken} = await refreshTokens(refreshToken));
  } else {
    newAccessToken = accessToken;
    newRefreshToken = refreshToken;
  }
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

function isTokenExpired(token: {exp: number}): boolean {
  return token.exp * 1000 < Date.now();
}

function getPayloadFromToken<TToken>(token: string): TToken {
  const [, payload] = token.split(`.`);
  if (!payload) {
    throw new Error(`Invalid JWT token.`);
  }

  return JSON.parse(Buffer.from(payload, `base64`).toString(`ascii`)) as TToken;
}

async function refreshTokens(refreshToken: string): Promise<IAuthTokens> {
  try {
    const {accessToken, refreshToken: newRefreshToken} = await dataProviderService.refreshTokens(refreshToken);
    return {accessToken, refreshToken: newRefreshToken};
  } catch (e) {
    return Promise.reject(`Failed to refresh tokens: \n${(e as unknown).toString()}`);
  }
}

function getUserFromToken(accessToken: string): IUserPreview {
  const {id, firstName, lastName, avatar} = getPayloadFromToken<IAccessToken>(accessToken);
  return {
    id,
    firstName,
    lastName,
    avatar,
  };
}
