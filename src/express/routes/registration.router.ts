import {Router} from "express";
import {streamPage} from "../utils/stream-page";
import {RegistrationPage} from "../views/pages/RegistrationPage";

export const registrationRouter = Router();

registrationRouter.get(`/`, (req, res, next) => {
  streamPage(res, RegistrationPage, {endPoint: `#`});
});
