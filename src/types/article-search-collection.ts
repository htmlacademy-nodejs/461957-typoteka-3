import type {ArticleSearchResult} from "./article-search-result";

export interface ArticleSearchCollection {
  items: ArticleSearchResult[];
  query: string;
  itemsCount: number;
}
