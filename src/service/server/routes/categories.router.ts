import {Request, Response, Router} from "express";

import {HttpCode} from "../../../constants";
import {ArticlesController} from "../controllers/articles.controller";
import {CategoriesController} from "../controllers/categories.controller";

import {getPaginationFromReqQuery} from "./utilities/get-pagination-from-req-query";

const categoriesRouter = (
  articlesController: ArticlesController,
  categoriesController: CategoriesController,
): Router => {
  const router = Router();

  router.get(`/`, async (req, res) => {
    const {status = HttpCode.OK, payload} = await categoriesController.getCategories();
    return res.status(status).send(payload);
  });

  router.get(`/:id`, async (req: Request, res: Response) => {
    const {limit, offset} = getPaginationFromReqQuery(req);
    const categoryId = parseInt(req.params.id, 10);
    const {status = HttpCode.OK, payload} = await articlesController.getArticlesByCategory({categoryId, limit, offset});
    return res.status(status).send(payload);
  });

  return router;
};

export {
  categoriesRouter,
};
