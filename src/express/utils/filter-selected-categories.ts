import {CategoryId} from "../../types/category-id";

export function filterSelectedCategories<T extends {id: CategoryId}, J extends {id: CategoryId}>(
  allCategories: T[],
  selectedCategories: J[],
): T[] {
  return allCategories.filter(item => selectedCategories.map(selected => selected.id).includes(item.id));
}
