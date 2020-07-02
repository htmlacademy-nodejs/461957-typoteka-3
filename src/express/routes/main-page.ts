import {Router} from "express";
import {HttpCode, JSXPages, TemplateNames} from "../../constants-es6";
import {MainPageController} from "../controllers/main-page.controller";

export const mainPageRouter = Router();

const mainPageController = new MainPageController();

mainPageRouter.get(`/`, async (req, res) => {
  const articles = await mainPageController.getArticles();
  if (articles !== null) {
    res.render(JSXPages.MAIN_PAGE, {articles});
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
});
