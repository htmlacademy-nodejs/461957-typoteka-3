import {NextFunction, Router} from "express";
import {HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services/data-provider.service";
import {streamPage} from "../utils/stream-page";
import {MainPage} from "../views/pages/MainPage";
import {SSRError} from "../errors/ssr-error";

export const mainPageRouter = Router();

mainPageRouter.get(`/`, async (req, res, next: NextFunction) => {
  try {
    const articles = await dataProviderService.getArticles();
    if (articles !== null) {
      streamPage(res, MainPage, {articles});
    } else {
      next(new SSRError({message: `Failed to load articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
  } catch (e) {
    next(new SSRError({message: `Failed to load articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
  }
});
