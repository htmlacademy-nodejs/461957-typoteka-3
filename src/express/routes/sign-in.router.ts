import {streamPage} from "../utils/stream-page";
import {Request, Response, Router} from "express";
import {SignInPage} from "../views/pages/SignInPage";

export const signInRouter = Router();

signInRouter.get(`/`, (req: Request, res: Response) => {
  streamPage(res, SignInPage, {endPoint: `#`});
});
