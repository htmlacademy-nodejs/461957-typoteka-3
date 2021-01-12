import {NewArticle} from "./article";

export interface ArticleFromBrowser extends Omit<NewArticle, `category`> {
  category: Record<string, `on`>;
}
