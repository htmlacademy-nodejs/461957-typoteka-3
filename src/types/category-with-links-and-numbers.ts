import {CategoryWithNumbers} from "./category-with-numbers";
import {CategoryWithLink} from "./category-with-link";

export interface CategoryWithLinksAndNumbers extends CategoryWithNumbers, CategoryWithLink {}
