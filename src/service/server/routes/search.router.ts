import {Router} from "express";
import {searchController} from "../controllers";
import {HttpCode} from "../../../constants-es6";

export const searchRouter = Router();
searchRouter.get(``, async (req, res) => {
  const {status = HttpCode.OK, payload} = await searchController.findArticleByMatch(req.query?.query as string);
  return res.status(status).send(payload);
});
