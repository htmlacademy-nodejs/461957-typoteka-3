import csrf from "csurf";
import {NextFunction, Request, Router} from "express";

import {HttpCode} from "../../constants-es6";
import {ClientRoute} from "../../shared/constants/routes/client-route";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {SSRError} from "../errors/ssr-error";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {SearchResultProps} from "../views/components/SearchResult/SearchResult";
import {SearchPage} from "../views/pages/SearchPage";

const csrfProtection = csrf({cookie: true});
export const searchRouter = Router();

searchRouter.get(`/`, [csrfProtection], (req: Request, res: IResponseExtended, next: NextFunction) => {
  if (!req.query?.query) {
    return streamPage(res, SearchPage, {
      currentUser: res.locals.currentUser,
      endPoint: ClientRoute.SEARCH.INDEX,
      csrf: req.csrfToken(),
    });
  }
  return next();
});

searchRouter.get(`/`, [csrfProtection], async (req: Request, res: IResponseExtended, next: NextFunction) => {
  const query = req.query.query as string;
  try {
    const searchResult = await dataProviderService.search(query);
    const matches: SearchResultProps[] = searchResult.items.map(match => ({
      text: match.title,
      match: query,
      date: new Date(Date.parse((match.createdDate as unknown) as string)),
      link: `${ClientRoute.ARTICLES.INDEX}/${match.id}`,
    }));
    return streamPage(res, SearchPage, {
      matches,
      query: searchResult.query,
      itemsCount: searchResult.totalCount,
      endPoint: ClientRoute.SEARCH.INDEX,
      currentUser: res.locals.currentUser,
      csrf: req.csrfToken(),
    });
  } catch (e) {
    return next(
      new SSRError({
        message: `Search failed`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});
