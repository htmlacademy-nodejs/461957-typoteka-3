import {ArticleId} from "./article-id";

interface ArticleSearchResult {
  id: ArticleId;
  title: string;
  createdDate: Date;
}

export {
  ArticleSearchResult,
};
