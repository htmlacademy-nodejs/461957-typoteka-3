import {DataProviderService} from "../services/data-provider.service";
import {HttpCode} from "../../../constants-es6";
import {ControllerResponse} from "../../../types/controller-response";
import {CategoryWithNumbers} from "../../../types/category-with-numbers";

export class CategoriesController {
  constructor(private dataProvider: DataProviderService) {}

  public async getCategories(): Promise<ControllerResponse<CategoryWithNumbers[]>> {
    const categories = await this.dataProvider.getCategories();
    if (categories === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {payload: categories};
  }
}
