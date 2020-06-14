import {dataProviderService, DataProviderService} from "../services/data-provider.service";

export class CategoriesController {
  constructor(private dataProvider: DataProviderService) {
  }

  public getCategories(): Promise<string[]> {
    return this.dataProvider.getCategories();
  }
}

export const categoriesController = new CategoriesController(dataProviderService);
