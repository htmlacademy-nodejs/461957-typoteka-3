import {CategoryWithNumbers} from "./category-with-numbers";
import {CategoryWithLink} from "./category-with-link";

interface CategoryWithLinksAndNumbers extends CategoryWithNumbers, CategoryWithLink {}

export {
  CategoryWithLinksAndNumbers,
};
