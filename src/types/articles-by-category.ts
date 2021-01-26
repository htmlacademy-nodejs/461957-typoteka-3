import {Category} from "./category";
import {ICollection} from "./interfaces/collection";
import {IArticlePreview} from "./interfaces/article-preview";

export interface ArticlesByCategory extends ICollection<IArticlePreview> {
  category: Category;
}
