import type {ArticleSearchResult} from "./article-search-result";
import {Collection} from "./collection";

export interface ArticleSearchCollection extends Collection {
  items: ArticleSearchResult[];
  query: string;
}
