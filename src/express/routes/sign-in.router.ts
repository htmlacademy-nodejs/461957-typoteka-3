import {streamPage} from "../utils/stream-page";
import {NextFunction, Request, Router} from "express";
import {SignInPage} from "../views/pages/SignInPage";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {SSRError} from "../errors/ssr-error";
import {ILogin} from "../../types/interfaces/login";
import multer from "multer";
import {IAuthorizationFailed, IAuthorizationSuccess} from "../../types/interfaces/authorization-result";
import {setAuthCookie} from "../helpers/cookie.helper";
import {IResponseExtended} from "../../types/interfaces/response-extended";

const multerMiddleware = multer();
export const signInRouter = Router();

signInRouter.get(`/`, (req: Request, res: IResponseExtended) => {
  streamPage(res, SignInPage, {endPoint: ClientRoutes.SIGN_IN});
});

signInRouter.post(`/`, [multerMiddleware.none()], async (req: Request, res: IResponseExtended, next: NextFunction) => {
  const signIn = {
    ...(req.body as ILogin),
  };
  try {
    const signInValidationResponse: IAuthorizationSuccess | IAuthorizationFailed = await dataProviderService.signIn(
      signIn,
    );
    if (signInValidationResponse.isSuccess) {
      setAuthCookie(res, signInValidationResponse.payload);
      return res.redirect(ClientRoutes.INDEX);
    }
    return streamPage(res, SignInPage, {
      endPoint: ClientRoutes.SIGN_IN,
      signInValidationResponse: (signInValidationResponse as IAuthorizationFailed).payload,
      signIn: {email: signIn.email},
    });
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to sign in`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});
