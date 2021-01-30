import {Router} from "express";
import {UsersController} from "../controllers/users.controller";
import {HttpCode} from "../../../constants-es6";

export const usersRouter = (usersController: UsersController): Router => {
  const router = Router();

  router.get(`/:id`, async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await usersController.getOne(userId);
    return res.status(status).send(payload);
  });

  return router;
};
