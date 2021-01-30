import {Router} from "express";
import {UsersController} from "../controllers/users.controller";

export const usersRouter = (usersController: UsersController): Router => {
  const router = Router();

  return router;
};
