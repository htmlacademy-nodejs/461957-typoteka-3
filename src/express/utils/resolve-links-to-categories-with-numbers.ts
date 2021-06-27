import {ClientRoute} from "../../constants-es6";
import {CategoryWithLinksAndNumbers} from "../../types/category-with-links-and-numbers";
import {CategoryWithNumbers} from "../../types/category-with-numbers";

export function resolveLinksToCategoriesWithNumbers(categories: CategoryWithNumbers[]): CategoryWithLinksAndNumbers[] {
  return categories.map(({id, label, count}) => ({
    id,
    label,
    link: `${ClientRoute.ARTICLES.CATEGORY}/${id}`,
    count,
  }));
}
