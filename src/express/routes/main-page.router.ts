import {NextFunction, Request, Router} from "express";

import {HttpCode} from "../../constants";
import {CategoryWithLink} from "../../types/category-with-link";
import {CategoryWithLinksAndNumbers} from "../../types/category-with-links-and-numbers";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {SSRError} from "../errors/ssr-error";
import {getArticleLink} from "../helpers/link-resolver";
import {getCurrentPage, getOffsetFromPage, getPageFromReqQuery} from "../helpers/page-resolver";
import {dataProviderService} from "../services";
import {resolveCategoriesLinks} from "../utils/resolve-categories-links";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {streamPage} from "../utils/stream-page";
import {MainPage} from "../views/pages/MainPage";

export const mainPageRouter = Router();

mainPageRouter.get(`/`, async (req: Request, res: IResponseExtended, next: NextFunction) => {
  const page = getPageFromReqQuery(req);
  const offset = getOffsetFromPage(page);
  try {
    const [{items: articles, totalCount}, categories] = await Promise.all([
      dataProviderService.getArticles({offset}),
      dataProviderService.getCategoriesWithNumbers(),
    ]);
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
      currentUser: res.locals.currentUser,
    });
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to load articles or categories with statistics`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
      }),
    );
  }
});
