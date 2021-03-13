import {Router} from "express";
import {UsersController} from "../controllers/users.controller";
import {HttpCode} from "../../../constants-es6";
import {validateNewUser} from "../validators";
import {validateLogin} from "../validators/validate-login";

export const usersRouter = (usersController: UsersController): Router => {
  const router = Router();

  router.get(`/:id`, async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await usersController.getOne(userId);
    return res.status(status).send(payload);
  });

  router.post(`/`, async (req, res) => {
    try {
      const newUser = await validateNewUser(req.body);
      const {status = HttpCode.CREATED, payload} = await usersController.create(newUser);
      return res.status(status).send(payload);
    } catch (e) {
      return res.status(HttpCode.BAD_REQUEST).send(e);
    }
  });

  router.post(`/login`, async (req, res) => {
    try {
      const {email, password} = await validateLogin(req.body);
      const {status = HttpCode.OK, payload} = await usersController.login({email, password});
      return res.status(status).send(payload);
    } catch (e) {
      return res.status(HttpCode.FORBIDDEN).send(e);
    }
  });

  return router;
};
