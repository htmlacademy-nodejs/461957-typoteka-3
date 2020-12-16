import {streamPage} from "../utils/stream-page";
import {Router} from "express";
import {SignInPage} from "../views/pages/SignInPage";

export const signInRouter = Router();

signInRouter.get(`/`, (req, res) => {
  streamPage(res, SignInPage, {endPoint: `#`});
});
