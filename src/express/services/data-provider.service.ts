import axios, {AxiosResponse, AxiosStatic} from "axios";
import {Article} from "../../types/article";
import {ENV} from "../../shared/env/env";
import {HttpCode, APIRoutes} from "../../constants-es6";
import {ArticleComment} from "../../types/article-comment";
import {NewArticle} from "../../types/new-article";
import {ArticleValidationResponse} from "../../types/article-validation-response";
import {Category} from "../../types/category";

export class DataProviderService {
  private requestService: AxiosStatic;
  private apiEndPoint = ENV.API_HOST + `:` + ENV.PORT + APIRoutes.API;

  constructor() {
    this.requestService = axios;
  }

  public async getArticles(count?: number): Promise<Article[]> {
    let response: AxiosResponse<Article[]>;
    try {
      response = await this.requestService.get<Article[]>(this.apiEndPoint + APIRoutes.ARTICLES, {params: {count}});
    } catch (e) {
      console.error(`error`, e);
    }
    if (response && response.status === 200) {
      return response.data.map(transformDate);
    } else {
      console.error(response.data);
      return null;
    }
  }

  public async createArticle(newArticle: NewArticle): Promise<true | ArticleValidationResponse> {
    let response: AxiosResponse<Article | ArticleValidationResponse>;
    try {
      response = await this.requestService.post<ArticleValidationResponse>(
        this.apiEndPoint + APIRoutes.ARTICLES,
        newArticle,
      );
    } catch (e) {
      console.error(`Error during creation the new article`);
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (e?.response?.status === HttpCode.BAD_REQUEST) {
        return e?.response?.data as ArticleValidationResponse;
      }
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */
    }
    if (response && response?.status === HttpCode.CREATED) {
      return true;
    } else {
      console.error(response);
      return null;
    }
  }

  public async getArticleById(id: string): Promise<Article> {
    let response: AxiosResponse<Article>;
    try {
      response = await this.requestService.get<Article>(this.apiEndPoint + APIRoutes.ARTICLES + `/` + id, {});
    } catch (e) {
      console.error(`Failed to load article by id "${id}"`, e);
    }
    if (response && response.status === 200) {
      return transformDate(response.data);
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

  public async getCategories(): Promise<Category[]> {
    let response: AxiosResponse<Category[]>;
    try {
      response = await this.requestService.get<Category[]>(this.apiEndPoint + APIRoutes.CATEGORIES, {});
      return response.data;
    } catch (e) {
      console.error(`error`, e);
      return null;
    }
  }

  private async getArticleComments(articleId: string): Promise<ArticleComment[]> {
    let response: AxiosResponse<ArticleComment[]>;
    try {
      response = await this.requestService.get<ArticleComment[]>(
        this.apiEndPoint + APIRoutes.ARTICLES + `/` + articleId + APIRoutes.COMMENTS,
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

function transformDate(article: Article): Article {
  return {...article, createdDate: new Date(Date.parse((article.createdDate as unknown) as string))};
}

export const dataProviderService = new DataProviderService();
