import {NextFunction, Request, Response, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {RegistrationPage} from "../views/pages/RegistrationPage";

export const registrationRouter = Router();

registrationRouter.get(`/`, (req: Request, res: Response, next: NextFunction) => {
  streamPage(res, RegistrationPage, {endPoint: `#`});
});
