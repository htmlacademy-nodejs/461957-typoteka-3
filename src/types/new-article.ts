import {CategoryId} from "./category-id";

export interface NewArticle {
  title: string;
  createdDate: Date;
  announce: string;
  fullText?: string;
  category: CategoryId[];
}
