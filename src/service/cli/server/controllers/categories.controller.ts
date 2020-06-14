import {dataProviderService, DataProviderService} from "../services/data-provider.service";
import {Request, Response} from "express";

export class CategoriesController {
  constructor(private dataProvider: DataProviderService) {
  }

  public async getCategories(req: Request, res: Response): Promise<void> {
    res.send(await this.dataProvider.getCategories())
  }
}

export const categoriesController = new CategoriesController(dataProviderService);
