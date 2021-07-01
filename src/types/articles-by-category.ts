import {Category} from "./category";
import {ICollection} from "./interfaces/collection";
import {IArticlePreview} from "./interfaces/article-preview";

interface ArticlesByCategory extends ICollection<IArticlePreview> {
  category: Category;
}

export {
  ArticlesByCategory,
};
