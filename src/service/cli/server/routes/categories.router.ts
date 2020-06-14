import {Router} from "express";
import {categoriesController} from "../controllers/categories.controller";

// eslint-disable-next-line new-cap
export const categoriesRouter = Router();

categoriesRouter.get(`/`, (req, res) =>
  categoriesController.getCategories(req, res),
);
