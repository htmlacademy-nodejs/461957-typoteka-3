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

adminPublicationsRouter.get(`/comments`, async (req, res) => {
  const listOfComments = await mainPageController.getComments(3);
  if (listOfComments !== null) {
    res.render(JSXPages.ADMIN_COMMENTS_PAGE, {listOfComments});
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
});
