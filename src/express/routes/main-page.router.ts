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
import {getCurrentPage, getOffsetFromPage, getPageFromReqQuery} from "../helpers/page-resolver";
import {getArticleLink} from "../helpers/link-resolver";

export const mainPageRouter = Router();

mainPageRouter.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
  const page = getPageFromReqQuery(req);
  const offset = getOffsetFromPage(page);
  try {
    const [{items: articles, totalCount}, categories] = await Promise.all([
      dataProviderService.getArticles({offset}),
      dataProviderService.getCategoriesWithNumbers(),
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
    return streamPage(res, MainPage, {
      articles: articles.map(item => ({...item, link: getArticleLink(item.id)})),
      categoriesWithLinks,
      categoriesWithLinksAndNumbers,
      total: totalCount,
      page: getCurrentPage(offset),
      prefix: `?`,
    });
  } catch (e) {
    return next(new SSRError({message: `Failed to load articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
  }
});
