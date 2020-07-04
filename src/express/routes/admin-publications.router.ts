import {Router} from "express";
import {HttpCode, JSXPages} from "../../constants-es6";
import {dataProviderService} from "../services/data-provider.service";

export const adminPublicationsRouter = Router();

adminPublicationsRouter.get(`/`, async (req, res) => {
  const articles = await dataProviderService.getArticles();
  if (articles !== null) {
    res.render(JSXPages.ADMIN_PUBLICATIONS_PAGE, {articles});
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
});

adminPublicationsRouter.get(`/comments`, async (req, res) => {
  const listOfComments = await dataProviderService.getComments(3);
  if (listOfComments !== null) {
    res.render(JSXPages.ADMIN_COMMENTS_PAGE, {listOfComments});
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
});
