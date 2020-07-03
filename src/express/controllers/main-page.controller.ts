import axios, {AxiosStatic, AxiosResponse} from "axios";
import {Article} from "../../types/article";
import {ENV} from "../../shared/env/env";
import {Routes} from "../../constants-es6";

export class MainPageController {
  private requestService: AxiosStatic;
  private apiEndPoint = ENV.API_HOST + `:` + ENV.PORT + Routes.API;

  constructor() {
    this.requestService = axios;
  }

  public async getArticles(): Promise<Article[]> {
    let response: AxiosResponse<Article[]>;
    try {
      response = await this.requestService.get<Article[]>(this.apiEndPoint + Routes.ARTICLES, {});
    } catch (e) {
      console.error(`error`, e);
    }
    if (response && response.status === 200) {
      return response.data.map(article => ({
        ...article,
        createdDate: new Date(Date.parse((article.createdDate as unknown) as string)),
      }));
    } else {
      console.error(response.data);
      return null;
    }
  }
}
