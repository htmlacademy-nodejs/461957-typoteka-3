import {NextFunction, Request, Router} from "express";

import {HttpCode} from "../../constants";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {SSRError} from "../errors/ssr-error";
import {getArticleLink} from "../helpers/link-resolver";
import {getCurrentPage, getOffsetFromPage, getPageFromReqQuery} from "../helpers/page-resolver";
import {mapDiscussedArticles, mapRecentComments} from "../models/dto";
import {dataProviderService} from "../services";
import {resolveCategoriesLinks} from "../utils/resolve-categories-links";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {streamPage} from "../utils/stream-page";
import {MainPage} from "../views/pages/MainPage";
import {getArticles} from "../data-providers";

const mainPageRouter = Router();

mainPageRouter.get(`/`, async (req: Request, res: IResponseExtended, next: NextFunction) => {
  const page = getPageFromReqQuery(req);
  const offset = getOffsetFromPage(page);
  try {
    const [{items: articles, totalCount}, categories, recentComments, discussedArticles] = await Promise.all([
      getArticles({offset}),
      dataProviderService.getCategoriesWithNumbers(),
      dataProviderService.getRecentComments(),
      dataProviderService.getDiscussedArticles(),
    ]);
    return streamPage(res, MainPage, {
      articles: articles.map(item => ({...item, link: getArticleLink(item.id)})),
      categoriesWithLinks: resolveCategoriesLinks(categories),
      categoriesWithLinksAndNumbers: resolveLinksToCategoriesWithNumbers(categories),
      total: totalCount,
      page: getCurrentPage(offset),
      prefix: `?`,
      currentUser: res.locals.currentUser,
      lastComments: mapRecentComments(recentComments),
      discussedArticles: mapDiscussedArticles(discussedArticles),
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

export {mainPageRouter};
