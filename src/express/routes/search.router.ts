import {NextFunction, Request, Response, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {SearchPage} from "../views/pages/SearchPage";
import {SearchResultProps} from "../views/components/SearchResult/SearchResult";
import {dataProviderService} from "../services";
import {SSRError} from "../errors/ssr-error";
import {ClientRoutes, HttpCode} from "../../constants-es6";

export const searchRouter = Router();

searchRouter.get(`/`, (req: Request, res: Response, next: NextFunction) => {
  if (!req.query?.query) {
    return streamPage(res, SearchPage);
  } else {
    return next();
  }
});

searchRouter.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.query as string;
  try {
    const searchResult = await dataProviderService.search(query);
    if (searchResult === null) {
      return next(new SSRError({message: `Search failed`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
    const matches: SearchResultProps[] = searchResult.items.map(match => ({
      text: match.title,
      match: query,
      date: new Date(Date.parse((match.createdDate as unknown) as string)),
      link: `${ClientRoutes.ARTICLES.INDEX}/${match.id}`,
    }));
    return streamPage(res, SearchPage, {
      matches,
      query: searchResult.query,
      itemsCount: searchResult.itemsCount,
      endPoint: ClientRoutes.SEARCH.INDEX,
    });
  } catch (e) {
    return next(
      new SSRError({
        message: `Search failed`,
        statusCode: HttpCode.NOT_FOUND,
        errorPayload: e as Error,
      }),
    );
  }
});
