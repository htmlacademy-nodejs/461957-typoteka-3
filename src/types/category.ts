import type {CategoryId} from "./category-id";

export interface Category {
  label: string;
  id: CategoryId;
}

export interface ICategoryId {
  id: CategoryId;
}
