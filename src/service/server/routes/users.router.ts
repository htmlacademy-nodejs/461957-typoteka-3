import {Request, Response, Router} from "express";

import {HttpCode} from "../../../constants";
import {UsersController} from "../controllers/users.controller";
import {authMiddleware} from "../middlewares";
import {validateNewUser} from "../validators";

export const usersRouter = (usersController: UsersController): Router => {
  const router = Router();

  router.get(`/id/:id`, async (req, res) => {
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
  router.get(`/comments`, [authMiddleware], async (req: Request, res: Response) => {
    const accessToken = req.headers[`authorization`];
    const {status = HttpCode.OK, payload} = await usersController.getAuthorsComments(accessToken);
    res.status(status).send(payload);
  });

  return router;
};
