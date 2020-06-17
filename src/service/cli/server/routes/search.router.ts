import {Router} from "express";
import {searchController} from "../controllers";

export const searchRouter = Router();
searchRouter.get(``, async (req, res) =>
  searchController.getArticlesByTitle(req, res),
);
