import {Router} from "express";
import {streamPage} from "../utils/stream-page";
import {CategoriesPage} from "../views/pages/CategoriesPage";

export const categoriesRouter = Router();

categoriesRouter.get(`/`, (req, res) => {
  streamPage(res, CategoriesPage, {newCategoryEndPoint: `#`});
});
