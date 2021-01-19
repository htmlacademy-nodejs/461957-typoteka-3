import {NewArticle} from "./article";

export interface ArticleFromBrowser extends Omit<NewArticle, `categories`> {
  categories: Record<string, `on`>;
}
