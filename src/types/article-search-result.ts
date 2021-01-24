import {ArticleId} from "./article-id";

export interface ArticleSearchResult {
  id: ArticleId;
  title: string;
  createdDate: Date;
}
