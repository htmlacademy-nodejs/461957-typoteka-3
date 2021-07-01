import {ICategoryId} from "../../types/category";

function convertCategoriesToArray(categories: Record<string, `on`>): ICategoryId[] {
  if (!categories) {
    return [];
  }
  return Object.keys(categories).map(item => ({id: parseInt(item, 10)}));
}

export {
  convertCategoriesToArray,
};
