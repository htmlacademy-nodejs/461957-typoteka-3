import {Request, Response, Router} from "express";
import {HttpCode} from "../../../constants-es6";
import {ArticlesController} from "../controllers/articles.controller";
import {CategoriesController} from "../controllers/categories.controller";

export const categoriesRouter = (
  articlesController: ArticlesController,
  categoriesController: CategoriesController,
): Router => {
  const router = Router();

  router.get(`/`, async (req, res) => {
    const {status = HttpCode.OK, payload} = await categoriesController.getCategories();
    return res.status(status).send(payload);
  });

  router.get(`/:id`, async (req: Request, res: Response) => {
    const categoryId = Number(req.params.id);
    const {status = HttpCode.OK, payload} = await articlesController.getArticlesByCategory(categoryId);
    return res.status(status).send(payload);
  });

  return router;
};
