import {ICategoryId} from "../../types/category";

export function convertCategoriesToArray(categories: Record<string, `on`>): ICategoryId[] {
  if (!categories) {
    return [];
  }
  return Object.keys(categories).map(item => ({id: parseInt(item, 10)}));
}
