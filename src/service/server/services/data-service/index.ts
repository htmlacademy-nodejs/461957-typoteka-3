import {CategoriesService} from "./categories.service";
import {ICategoryModel} from "../../data-access/models/category";

export const categoriesFactory = (CategoryModel: ICategoryModel): CategoriesService =>
  new CategoriesService(CategoryModel);
