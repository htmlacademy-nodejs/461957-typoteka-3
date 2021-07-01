import type {Request, Response} from "express";

import {IAuthTokens} from "../../types/interfaces/auth-tokens";
import {COOKIE_TOKEN} from "../constants/cookie-token.constant";

function setAuthCookie(res: Response, value: IAuthTokens): void {
  res.cookie(COOKIE_TOKEN, JSON.stringify(value), {httpOnly: true});
}

function invalidateAuthCookie(res: Response): void {
  res.cookie(COOKIE_TOKEN, null, {httpOnly: true, maxAge: 0});
}

function getAuthTokenFromCookies(req: Request): string {
  return (req?.cookies as Record<string, string>)[COOKIE_TOKEN];
}

function getAccessTokenFromCookies(req: Request): string {
  const plainCookie = getAuthTokenFromCookies(req);
  if (!plainCookie) {
    return null;
  }
  const {accessToken} = JSON.parse(plainCookie) as IAuthTokens;
  return accessToken;
}

function getRefreshTokenFromCookies(req: Request): string | null {
  const plainCookie = getAuthTokenFromCookies(req);
  if (!plainCookie) {
    return null;
  }
  const {refreshToken} = JSON.parse(plainCookie) as IAuthTokens;
  return refreshToken;
}

export {
  getAccessTokenFromCookies,
  getAuthTokenFromCookies,
  getRefreshTokenFromCookies,
  invalidateAuthCookie,
  setAuthCookie,
};
