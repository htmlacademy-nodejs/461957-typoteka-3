import {NextFunction, Request, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {SearchPage} from "../views/pages/SearchPage";
import {SearchResultProps} from "../views/components/SearchResult/SearchResult";
import {dataProviderService} from "../services";
import {SSRError} from "../errors/ssr-error";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import csrf from "csurf";

const csrfProtection = csrf({cookie: true});
export const searchRouter = Router();

searchRouter.get(`/`, [csrfProtection], (req: Request, res: IResponseExtended, next: NextFunction) => {
  if (!req.query?.query) {
    return streamPage(res, SearchPage, {
      currentUser: res.locals.currentUser,
      endPoint: ClientRoutes.SEARCH.INDEX,
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
      link: `${ClientRoutes.ARTICLES.INDEX}/${match.id}`,
    }));
    return streamPage(res, SearchPage, {
      matches,
      query: searchResult.query,
      itemsCount: searchResult.totalCount,
      endPoint: ClientRoutes.SEARCH.INDEX,
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
