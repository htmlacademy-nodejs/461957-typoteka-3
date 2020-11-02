import {Router} from "express";
import {streamPage} from "../utils/stream-page";
import {SearchPage} from "../views/pages/SearchPage";
import {SearchResultProps} from "../views/components/SearchResult/SearchResult";

export const searchRouter = Router();

const matches: SearchResultProps[] = [
  {
    date: new Date(Date.now()),
    text: `Huawei открыла в России путешествия на смартфон Mate 30 Pro без сервисов Google`,
    match: `путешествия`,
  },
  {
    date: new Date(Date.now()),
    text: `«Яндекс.Метрика» запустила путешествия сервис для оценки эффективности баннеров и видеорекламы в реальном времени`,
    match: `путешествия`,
  },
  {
    date: new Date(Date.now()),
    text: `«Яндекс.Метрика» запустила смартфон Mate 30 Pro без приложения "путешествия"`,
    match: `путешествия`,
  },
  {
    date: new Date(Date.now()),
    text: `Huawei открыла в России путешествия на сервис «Яндекс.Метрика»`,
    match: `путешествия`,
  },
];

searchRouter.get(`/`, (req, res, next) => {
  streamPage(res, SearchPage, {searchQuery: `Путешествия`, matches});
});
