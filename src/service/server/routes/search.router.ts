import {Router} from "express";

import {HttpCode} from "../../../constants";
import {SearchController} from "../controllers/search.controller";

export const searchRouter = (searchController: SearchController): Router => {
  const router = Router();

  router.get(``, async (req, res) => {
    const {status = HttpCode.OK, payload} = await searchController.findArticleByMatch(req.query?.query as string);
    return res.status(status).send(payload);
  });

  return router;
};
