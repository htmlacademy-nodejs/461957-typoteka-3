import type {Request, Response} from "express";
import {COOKIE_TOKEN} from "../constants/cookie-token.constant";
import {IAuthTokens} from "../../types/interfaces/auth-tokens";

export function setAuthCookie(res: Response, value: IAuthTokens): void {
  res.cookie(COOKIE_TOKEN, JSON.stringify(value), {httpOnly: true});
}

export function invalidateAuthCookie(res: Response): void {
  res.cookie(COOKIE_TOKEN, null, {httpOnly: true, maxAge: 0});
}

export function getTokenFromCookies(req: Request): string {
  return (req?.cookies as Record<string, string>)[COOKIE_TOKEN];
}

export function getRefreshTokenFromCookies(req: Request): string | null {
  const plainCookie = getTokenFromCookies(req);
  if (!plainCookie) {
    return null;
  }
  const {refreshToken} = JSON.parse(plainCookie) as IAuthTokens;
  return refreshToken;
}
