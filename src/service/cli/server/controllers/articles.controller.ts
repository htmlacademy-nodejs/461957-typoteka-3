import {DataProviderService} from "../services/data-provider.service";
import {Request, Response} from "express";
import {HttpCode} from "../../../../constants-es6";

export class ArticlesController {
  constructor(private dataProvider: DataProviderService) {}

  public async getArticles(req: Request, res: Response): Promise<void> {
    const articles = await this.dataProvider.getArticles();
    if (articles === null) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
      return;
    }
    res.send(articles);
  }
}
