import {Router} from "express";
import {streamPage} from "../utils/stream-page";
import {SearchPage} from "../views/pages/SearchPage";
import {SearchResultProps} from "../views/components/SearchResult/SearchResult";
import {dataProviderService} from "../services/data-provider.service";
import {SSRError} from "../errors/ssr-error";
import {HttpCode} from "../../constants-es6";
import {ArticleSearchResult} from "../../types/article-search-result";

export const searchRouter = Router();

const mock: SearchResultProps[] = [
  {
    date: new Date(Date.now()),
    text: `Huawei открыла в России путешествия на смартфон Mate 30 Pro без сервисов Google`,
    match: `путешествия`,
    link: ``,
  },
  {
    date: new Date(Date.now()),
    text: `«Яндекс.Метрика» запустила путешествия сервис для оценки эффективности баннеров и видеорекламы в реальном времени`,
    match: `путешествия`,
    link: ``,
  },
  {
    date: new Date(Date.now()),
    text: `«Яндекс.Метрика» запустила смартфон Mate 30 Pro без приложения "путешествия"`,
    match: `путешествия`,
    link: ``,
  },
  {
    date: new Date(Date.now()),
    text: `Huawei открыла в России путешествия на сервис «Яндекс.Метрика»`,
    match: `путешествия`,
    link: ``,
  },
];

searchRouter.get(`/`, (req, res, next) => {
  if (!req.query?.query) {
    streamPage(res, SearchPage);
  } else {
    next();
  }
});

searchRouter.get(`/`, async (req, res, next) => {
  const query = req.query.query as string;
  try {
    const searchResult = await dataProviderService.search(query);
    if (searchResult !== null) {
      streamPage(res, SearchPage, {
        matches: searchResult.items.map(match => mapMatchesToProps(match, query)),
        query: searchResult.query,
        itemsCount: searchResult.itemsCount,
      });
    } else {
      next(new SSRError({message: `Search failed`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
  } catch (e) {
    next(
      new SSRError({
        message: `Search failed`,
        statusCode: HttpCode.NOT_FOUND,
        errorPayload: e as Error,
      }),
    );
  }
});

function mapMatchesToProps(articleSearchResult: ArticleSearchResult, query: string): SearchResultProps {
  return {
    text: articleSearchResult.title,
    match: query,
    date: articleSearchResult.createdDate,
    link: articleSearchResult.link,
  };
}
