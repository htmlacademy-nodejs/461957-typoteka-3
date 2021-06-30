import type {CategoryId} from "./category-id";

interface Category {
  label: string;
  id: CategoryId;
}

interface ICategoryId {
  id: CategoryId;
}

export {
  Category,
  ICategoryId,
};
