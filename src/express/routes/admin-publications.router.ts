import {Router} from "express";
import {HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services/data-provider.service";
import {streamPage} from "../utils/stream-page";
import AdminCommentsPage from "../views/AdminCommentsPage";
import {AdminPublicationsPage} from "../views/pages/AdminPublicationsPage";

export const adminPublicationsRouter = Router();

adminPublicationsRouter.get(`/`, async (req, res) => {
  const articles = await dataProviderService.getArticles();
  if (articles !== null) {
    streamPage(res, AdminPublicationsPage, {articles});
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
});

adminPublicationsRouter.get(`/comments`, async (req, res) => {
  const listOfComments = await dataProviderService.getComments(3);
  if (listOfComments !== null) {
    streamPage(res, AdminCommentsPage, {listOfComments});
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
});
