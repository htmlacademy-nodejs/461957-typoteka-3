import {Router} from "express";
import {categoriesController} from "../controllers";
import {HttpCode} from "../../../../constants-es6";

// eslint-disable-next-line new-cap
export const categoriesRouter = Router();

categoriesRouter.get(`/`, async (req, res) => {
  const {status = HttpCode.OK, payload} = await categoriesController.getCategories();
  return res.status(status).send(payload);
});
