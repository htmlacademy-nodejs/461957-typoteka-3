import {Request, Response, Router} from "express";
import {articlesController, categoriesController} from "../controllers";
import {HttpCode} from "../../../constants-es6";

// eslint-disable-next-line new-cap
const categoriesRouter = Router();

categoriesRouter.get(`/`, async (req, res) => {
  const {status = HttpCode.OK, payload} = await categoriesController.getCategories();
  return res.status(status).send(payload);
});

categoriesRouter.get(`/:id`, async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const {status = HttpCode.OK, payload} = await articlesController.getArticlesByCategory(categoryId);
  return res.status(status).send(payload);
});

export {categoriesRouter};
