import type {Request, Response} from "express";
import {COOKIE_TOKEN} from "../constants/cookie-token.constant";
import {IAuthTokens} from "../../types/interfaces/auth-tokens";

export function setAuthCookie(res: Response, value: IAuthTokens): void {
  res.cookie(COOKIE_TOKEN, JSON.stringify(value), {httpOnly: true});
}

export function getTokenFromCookies(req: Request): string {
  return (req?.cookies as Record<string, string>)[COOKIE_TOKEN];
}
