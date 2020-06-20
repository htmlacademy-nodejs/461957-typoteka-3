import {Router} from "express";
import {searchController} from "../controllers";
import {HttpCode} from "../../../../constants-es6";

export const searchRouter = Router();
searchRouter.get(``, async (req, res) => {
  const {status = HttpCode.OK, payload} = await searchController.getArticlesByTitle(req.query?.query);
  res.status(status).send(payload);
});
