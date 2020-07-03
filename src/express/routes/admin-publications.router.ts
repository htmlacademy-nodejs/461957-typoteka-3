import {Router} from "express";
import {HttpCode, JSXPages} from "../../constants-es6";
import {MainPageController} from "../controllers/main-page.controller";

export const adminPublicationsRouter = Router();

const mainPageController = new MainPageController();

adminPublicationsRouter.get(`/`, async (req, res) => {
  const articles = await mainPageController.getArticles();
  if (articles !== null) {
    res.render(JSXPages.ADMIN_PUBLICATIONS_PAGE, {articles});
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
});

adminPublicationsRouter.get(`/comments`, (req, res) => res.send(`comments`));
