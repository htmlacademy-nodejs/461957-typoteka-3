import csrf from "csurf";
import {NextFunction, Request, Router} from "express";
import multer from "multer";

import {HttpCode} from "../../constants";
import {ClientRoute} from "../../shared/constants/routes/client-route";
import {ICsrf} from "../../types/article";
import {IAuthorizationFailed, IAuthorizationSuccess} from "../../types/interfaces/authorization-result";
import {ILogin} from "../../types/interfaces/login";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {SSRError} from "../errors/ssr-error";
import {setAuthCookie} from "../helpers/cookie.helper";
import {signInValidationResponseMapper} from "../models/dto";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {SignInPage} from "../views/pages/SignInPage";

const csrfProtection = csrf({cookie: true});
const multerMiddleware = multer();
const signInRouter = Router();

signInRouter.get(`/`, [csrfProtection], (req: Request, res: IResponseExtended) => {
  streamPage(res, SignInPage, {endPoint: ClientRoute.SIGN_IN, csrf: req.csrfToken(), signInValidationResponse: {}});
});

signInRouter.post(
  `/`,
  [multerMiddleware.none(), csrfProtection],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    const signIn: ILogin = {
      email: (req.body as ILogin & ICsrf).email,
      password: (req.body as ILogin & ICsrf).password,
    };
    try {
      const signInValidationResponse: IAuthorizationSuccess | IAuthorizationFailed = await dataProviderService.signIn(
        signIn,
      );
      if (signInValidationResponse.isSuccess) {
        setAuthCookie(res, signInValidationResponse.payload);
        return res.redirect(ClientRoute.INDEX);
      }
      return streamPage(res, SignInPage, {
        endPoint: ClientRoute.SIGN_IN,
        signInValidationResponse: signInValidationResponseMapper(
          (signInValidationResponse as IAuthorizationFailed).payload,
        ),
        signIn: {email: signIn.email},
        csrf: req.csrfToken(),
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
  },
);

export {signInRouter};
