import {DataProviderService} from "../services/data-provider.service";
import {Request, Response} from "express";
import {HttpCode} from "../../../../constants-es6";
import {dataProviderService} from "../services";
import {ControllerResponse} from "../../../../types/controller-response";
import {Article} from "../../../../types/article";

export class SearchController {
  constructor(private dataProvider: DataProviderService) {}

  public async getArticlesByTitle(query: string): Promise<ControllerResponse<Article[]>> {
    if (query === undefined) {
      return {status: HttpCode.BAD_REQUEST};
    }
    if (query === `` || query === ` `) {
      return {payload: []}
    }
    const titles = await this.dataProvider.searchByArticlesTitle(query);
    if (titles === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {payload: titles}
  }
}
