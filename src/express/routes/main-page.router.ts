import {NextFunction, Router} from "express";
import {HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {MainPage} from "../views/pages/MainPage";
import {SSRError} from "../errors/ssr-error";

export const mainPageRouter = Router();

const articlesNumber = 8;

mainPageRouter.get(`/`, async (req, res, next: NextFunction) => {
  try {
    const [articles, categories] = await Promise.all([
      dataProviderService.getArticles(articlesNumber),
      dataProviderService.getCategories(),
    ]);
    if (articles !== null && categories !== null) {
      streamPage(res, MainPage, {articles, availableCategories: categories});
    } else {
      next(new SSRError({message: `Failed to load articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
  } catch (e) {
    next(new SSRError({message: `Failed to load articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
  }
});
