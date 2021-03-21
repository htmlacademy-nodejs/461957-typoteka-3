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

  return router;
};
