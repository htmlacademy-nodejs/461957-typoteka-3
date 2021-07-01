import type {ArticleSearchResult} from "./article-search-result";
import {ICollection} from "./interfaces/collection";

interface ArticleSearchCollection extends ICollection<ArticleSearchResult> {
  query: string;
}

export {
  ArticleSearchCollection,
};
