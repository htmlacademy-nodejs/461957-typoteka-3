import {Category} from "./category";
import {Article} from "./article";
import {Collection} from "./collection";

export interface ArticlesByCategory extends Collection {
  category: Category,
  articles: Article[],
}
