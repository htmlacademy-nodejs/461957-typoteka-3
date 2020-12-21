import {NextFunction, Request, Response, Router} from "express";
import {HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {MainPage} from "../views/pages/MainPage";
import {SSRError} from "../errors/ssr-error";
import {resolveCategoriesLinks} from "../utils/resolve-categories-links";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {CategoryWithLinksAndNumbers} from "../../types/category-with-links-and-numbers";
import {CategoryWithLink} from "../../types/category-with-link";

export const mainPageRouter = Router();

const articlesNumber = 8;

mainPageRouter.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [articles, categories] = await Promise.all([
      dataProviderService.getArticles(articlesNumber),
      dataProviderService.getCategories(),
    ]);
    if (articles === null && categories === null) {
      return next(
        new SSRError({message: `Failed to load articles or categories`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}),
      );
    }
    const categoriesWithLinksAndNumbers: CategoryWithLinksAndNumbers[] = resolveLinksToCategoriesWithNumbers(
      categories,
    );
    const categoriesWithLinks: CategoryWithLink[] = resolveCategoriesLinks(categories);
    streamPage(res, MainPage, {
      articles,
      categoriesWithLinks,
      categoriesWithLinksAndNumbers,
    });
  } catch (e) {
    return next(new SSRError({message: `Failed to load articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
  }
});
