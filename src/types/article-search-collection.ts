import type {ArticleSearchResult} from "./article-search-result";
import {ICollection} from "./interfaces/collection";

export interface ArticleSearchCollection extends ICollection<ArticleSearchResult> {
  query: string;
}
