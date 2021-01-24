import {Category} from "../../types/category";

export function convertCategoriesToArray(categories: Record<string, `on`>): Category[] {
  return Object.keys(categories).map(item => ({id: parseInt(item, 10), label: ``}));
}
