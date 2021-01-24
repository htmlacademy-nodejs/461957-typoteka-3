import {Category} from "./category";
import {Collection} from "./collection";
import {IArticlePreview} from "./interfaces/article-preview";

export interface ArticlesByCategory extends Collection {
  category: Category;
  articles: IArticlePreview[];
}
