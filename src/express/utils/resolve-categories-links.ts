import {Category} from "../../types/category";
import {ClientRoute} from "../../constants-es6";
import {CategoryWithLink} from "../../types/category-with-link";

export function resolveCategoriesLinks(categories: Category[]): CategoryWithLink[] {
  return categories.map(({id, label}) => ({
    id,
    label,
    link: `${ClientRoute.ARTICLES.CATEGORY}/${id}`,
  }));
}
