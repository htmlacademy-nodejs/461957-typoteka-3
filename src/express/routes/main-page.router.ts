import {NextFunction, Request, Response, Router} from "express";
import {HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {MainPage} from "../views/pages/MainPage";
import {SSRError} from "../errors/ssr-error";
import {resolveCategoriesLinks} from "../utils/resolve-categories-links";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {CategoryWithNumbers} from "../../types/category-with-numbers";
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
    if (articles !== null && categories !== null) {
      const categoriesWithNumbers: CategoryWithNumbers[] = categories.map(item => ({...item, count: 1}));
      const categoriesWithLinksAndNumbers: CategoryWithLinksAndNumbers[] = resolveLinksToCategoriesWithNumbers(categoriesWithNumbers);
      const categoriesWithLinks: CategoryWithLink[] = resolveCategoriesLinks(categoriesWithNumbers);
      streamPage(res, MainPage, {
        articles,
        categoriesWithLinks,
        categoriesWithLinksAndNumbers,
      });
    } else {
      next(new SSRError({message: `Failed to load articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
  } catch (e) {
    next(new SSRError({message: `Failed to load articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
  }
});
