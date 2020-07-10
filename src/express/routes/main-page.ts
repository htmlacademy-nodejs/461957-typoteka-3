import {Router} from "express";
import {HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services/data-provider.service";
import {streamPage} from "../utils/stream-page";
import {MainPage} from "../views/MainPage";

export const mainPageRouter = Router();

mainPageRouter.get(`/`, async (req, res) => {
  const articles = await dataProviderService.getArticles();
  if (articles !== null) {
    streamPage(res, MainPage, {articles});
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
});
