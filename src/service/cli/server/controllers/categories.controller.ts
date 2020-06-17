import {DataProviderService} from "../services/data-provider.service";
import {Request, Response} from "express";
import {HttpCode} from "../../../../constants-es6";
import {dataProviderService} from "../services";

export class CategoriesController {
  constructor(private dataProvider: DataProviderService) {}

  public async getCategories(req: Request, res: Response): Promise<void> {
    const categories = await this.dataProvider.getCategories();
    if (categories === null) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
      return;
    }
    res.send(categories);
  }
}
