import {CategoriesService} from "./categories.service";
import {ICategoryModel} from "../../data-access/models/category";
import {IIntermediateModel} from "../../data-access/models/intermediate";

export const categoriesFactory = (
  CategoryModel: ICategoryModel,
  CategoryArticleIntermediateModel: IIntermediateModel,
): CategoriesService => new CategoriesService(CategoryModel, CategoryArticleIntermediateModel);
