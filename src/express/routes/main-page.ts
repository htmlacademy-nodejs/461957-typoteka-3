import {Router} from "express";
import {HttpCode, JSXPages} from "../../constants-es6";
import {DataProviderService} from "../controllers/data-provider.service";

export const mainPageRouter = Router();

const dataProviderService = new DataProviderService();

mainPageRouter.get(`/`, async (req, res) => {
  const articles = await dataProviderService.getArticles();
  if (articles !== null) {
    res.render(JSXPages.MAIN_PAGE, {articles});
  } else {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
  }
});
