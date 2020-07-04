import axios, {AxiosStatic, AxiosResponse} from "axios";
import {Article} from "../../types/article";
import {ENV} from "../../shared/env/env";
import {HttpCode, Routes} from "../../constants-es6";
import {ArticleComment} from "../../types/article-comment";

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

  public async getComments(quantityOfArticles: number): Promise<ArticleComment[]> {
    const articlesList = await this.getArticles();
    if (articlesList === null) {
      return null;
    }
    const comments = await Promise.all(
      articlesList.slice(0, quantityOfArticles).map(article => this.getArticleComments(article.id)),
    );
    if (comments === null) {
      return null;
    }
    return comments.flat(1);
  }

  private async getArticleComments(articleId: string): Promise<ArticleComment[]> {
    let response: AxiosResponse<ArticleComment[]>;
    try {
      response = await this.requestService.get<ArticleComment[]>(
        this.apiEndPoint + Routes.ARTICLES + `/` + articleId + Routes.COMMENTS,
        {},
      );
    } catch (e) {
      console.error(`error`, e);
    }
    if (response && response.status === HttpCode.OK) {
      return response.data;
    } else {
      console.error(response.data);
      return null;
    }
  }
}
