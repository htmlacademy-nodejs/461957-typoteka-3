import {Category} from "../../types/category";

export function convertCategoriesToArray(categories: Record<string, `on`>): Category[] {
  if (!categories) {
    return [];
  }
  return Object.keys(categories).map(item => ({id: parseInt(item, 10), label: ``}));
}
