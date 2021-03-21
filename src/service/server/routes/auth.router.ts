import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";
import {validateLogin} from "../validators/validate-login";
import {HttpCode} from "../../../constants-es6";

export const authRouter = (authController: AuthController): Router => {
  const router = Router();

  router.post(`/login`, async (req, res) => {
    try {
      const {email, password} = await validateLogin(req.body);
      const {status = HttpCode.OK, payload} = await authController.login({email, password});
      return res.status(status).send(payload);
    } catch (e) {
      return res.status(HttpCode.FORBIDDEN).send(e);
    }
  });

  router.post(`/refresh`, async (req, res) => {
    try {
      const existingRefreshToken = (req.body as {refreshToken: string})?.refreshToken;
      const {status = HttpCode.OK, payload} = await authController.refresh(existingRefreshToken);
      return res.status(status).send(payload);
    } catch (e) {
      return res.status(HttpCode.FORBIDDEN).send(e);
    }
  });

  router.post(`/sign-out`, async (req, res) => {
    try {
      const existingRefreshToken = (req.body as {refreshToken: string})?.refreshToken;
      const {status = HttpCode.OK} = await authController.dropRefreshToken(existingRefreshToken);
      return res.status(status).send();
    } catch (e) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e);
    }
  });

  return router;
};
