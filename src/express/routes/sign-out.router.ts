import {NextFunction, Request, Router} from "express";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {SSRError} from "../errors/ssr-error";
import {getRefreshTokenFromCookies, invalidateAuthCookie} from "../helpers/cookie.helper";
import {IResponseExtended} from "../../types/interfaces/response-extended";

export const signOutRouter = Router();

signOutRouter.get(`/`, async (req: Request, res: IResponseExtended, next: NextFunction) => {
  try {
    const refreshToken = getRefreshTokenFromCookies(req);
    await dataProviderService.signOut(refreshToken);
    invalidateAuthCookie(res);
    return res.redirect(ClientRoutes.INDEX);
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to sign out`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});
