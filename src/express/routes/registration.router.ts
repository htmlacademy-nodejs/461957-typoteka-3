import {NextFunction, Request, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {RegistrationPage} from "../views/pages/RegistrationPage";
import {dataProviderService} from "../services";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {SSRError} from "../errors/ssr-error";
import {IUserCreatingDoublePasswords, UserCreatingFromForm} from "../../types/interfaces/user-creating";
import {UserValidationResponse} from "../../types/user-validation-response";
import multer from "multer";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {RoleId} from "../../shared/constants/role-id";

const multerMiddleware = multer();
export const registrationRouter = Router();

registrationRouter.get(`/`, (req: Request, res: IResponseExtended) => {
  streamPage(res, RegistrationPage, {endPoint: ClientRoutes.REGISTRATION});
});

registrationRouter.post(
  `/`,
  [multerMiddleware.none()],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    const newUser: IUserCreatingDoublePasswords = {
      ...(req.body as UserCreatingFromForm),
      roleId: RoleId.AUTHOR,
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
  },
);
