import {NextFunction, Request, Response, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {RegistrationPage} from "../views/pages/RegistrationPage";
import {dataProviderService} from "../services";
import {ClientRoutes, HttpCode, ROLE_ID} from "../../constants-es6";
import {SSRError} from "../errors/ssr-error";
import {IUserCreatingDoublePasswords, UserCreatingFromForm} from "../../types/interfaces/user-creating";
import {UserValidationResponse} from "../../types/user-validation-response";
import multer from "multer";

const multerMiddleware = multer();
export const registrationRouter = Router();

registrationRouter.get(`/`, (req: Request, res: Response) => {
  streamPage(res, RegistrationPage, {endPoint: ClientRoutes.REGISTRATION});
});

registrationRouter.post(`/`, [multerMiddleware.none()], async (req: Request, res: Response, next: NextFunction) => {
  const newUser: IUserCreatingDoublePasswords = {
    ...(req.body as UserCreatingFromForm),
    roleId: ROLE_ID.AUTHOR,
  };
  try {
    const newUserValidationResponse: UserValidationResponse | void = await dataProviderService.createUser(newUser);
    if (!newUserValidationResponse) {
      return res.redirect(ClientRoutes.SIGN_IN);
    }
    return streamPage(res, RegistrationPage, {
      endPoint: ClientRoutes.REGISTRATION,
      userValidationResponse: newUserValidationResponse,
      user: newUser,
    });
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to create a user`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});
