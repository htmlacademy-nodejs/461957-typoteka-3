import {
  dataProviderService,
  DataProviderService,
} from "../services/data-provider.service";
import {Request, Response} from "express";
import {HttpCode} from "../../../../constants-es6";

export class SearchController {
  constructor(private dataProvider: DataProviderService) {}

  public async getArticlesByTitle(req: Request, res: Response): Promise<void> {
    if (!req.query.hasOwnProperty("query")) {
      res.status(HttpCode.BAD_REQUEST).send();
      return;
    }
    if (req.query.query === `` || req.query.query === ` `) {
      res.json([]);
      return;
    }
    try {
      res.json(await this.dataProvider.searchByArticlesTitle(req.query.query));
    } catch (e) {
      console.error(e);
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
    }
  }
}

export const searchController = new SearchController(dataProviderService);
