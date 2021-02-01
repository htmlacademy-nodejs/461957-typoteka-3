import {HttpCode} from "../../../constants-es6";
import {ControllerResponse} from "../../../types/controller-response";
import {CategoryWithNumbers} from "../../../types/category-with-numbers";
import {CategoriesService} from "../data-access/services/categories.service";
import {Category} from "../../../types/category";

export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  public async getCategories(): Promise<ControllerResponse<Category[]>> {
    const categories = await this.categoriesService.findAll();
    if (categories === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {payload: categories};
  }

  public async getCategoriesWithNumbers(): Promise<ControllerResponse<CategoryWithNumbers[]>> {
    const categories = await this.categoriesService.findAllWithNumbers();
    if (categories === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {payload: categories};
  }
}
