import {ClientRoute} from "../../shared/constants/routes/client-route";
import {Category} from "../../types/category";
import {CategoryWithLink} from "../../types/category-with-link";

export function resolveCategoriesLinks(categories: Category[]): CategoryWithLink[] {
  return categories.map(({id, label}) => ({
    id,
    label,
    link: `${ClientRoute.ARTICLES.CATEGORY}/${id}`,
  }));
}
