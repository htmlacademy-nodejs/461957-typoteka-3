import {NewArticle} from "./new-article";

export interface ArticleFromBrowser extends Omit<NewArticle, `category`> {
  category: Record<string, `on`>
}
