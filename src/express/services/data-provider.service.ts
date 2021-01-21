import axios, {AxiosResponse, AxiosStatic} from "axios";
import type {Article, ICreatedDate, NewArticle} from "../../types/article";
import {ENV} from "../../shared/env/env";
import {APIRoutes, HttpCode} from "../../constants-es6";
import type {ArticleComment} from "../../types/article-comment";
import type {ArticleValidationResponse} from "../../types/article-validation-response";
import type {ArticleSearchCollection} from "../../types/article-search-collection";
import {CategoryWithNumbers} from "../../types/category-with-numbers";
import {ArticlesByCategory} from "../../types/articles-by-category";
import {CategoryId} from "../../types/category-id";
import {Category} from "../../types/category";
import {IArticlePreview} from "../../types/interfaces/article-preview";
import {ArticleId} from "../../types/article-id";

export class DataProviderService {
  private requestService: AxiosStatic;
  private apiEndPoint = ENV.API_HOST + `:` + ENV.PORT + APIRoutes.API;

  constructor() {
    this.requestService = axios;
  }

  public async getArticles(count?: number): Promise<IArticlePreview[]> {
    let response: AxiosResponse<IArticlePreview[]>;
    try {
      response = await this.requestService.get<IArticlePreview[]>(this.apiEndPoint + APIRoutes.ARTICLES, {
        params: {count},
      });
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

  public async getArticleById(id: ArticleId): Promise<Article> {
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

  public async getArticlesByCategoryId(categoryId: CategoryId): Promise<ArticlesByCategory> {
    let response: AxiosResponse<ArticlesByCategory>;
    try {
      response = await this.requestService.get<ArticlesByCategory>(
        this.apiEndPoint + APIRoutes.CATEGORIES + `/` + categoryId.toString(10),
        {},
      );
    } catch (e) {
      console.error(`Failed to load articles by categoryId "${categoryId}"`, e);
    }
    if (response && response.status === 200) {
      return {
        category: response.data.category,
        articles: response.data.articles.map(transformDate),
        itemsCount: response.data.itemsCount,
      };
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

  public async getCategoriesWithNumbers(): Promise<CategoryWithNumbers[]> {
    let response: AxiosResponse<CategoryWithNumbers[]>;
    try {
      response = await this.requestService.get<CategoryWithNumbers[]>(
        this.apiEndPoint + APIRoutes.CATEGORIES_STATISTICS,
        {},
      );
      return response.data;
    } catch (e) {
      console.error(`error`, e);
      return null;
    }
  }

  public async search(query: string): Promise<ArticleSearchCollection> {
    let response: AxiosResponse<ArticleSearchCollection>;
    try {
      response = await this.requestService.get<ArticleSearchCollection>(this.apiEndPoint + APIRoutes.SEARCH, {
        params: {
          query,
        },
      });
    } catch (e) {
      console.error(`search request`, e);
    }
    if (response && response.status === HttpCode.OK) {
      return response.data;
    } else {
      console.error(`search request status`, response.data);
      return null;
    }
  }

  private async getArticleComments(articleId: ArticleId): Promise<ArticleComment[]> {
    let response: AxiosResponse<ArticleComment[]>;
    try {
      response = await this.requestService.get<ArticleComment[]>(
        `${this.apiEndPoint + APIRoutes.ARTICLES}/${articleId}${APIRoutes.COMMENTS}`,
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

function transformDate<T extends ICreatedDate>(article: T): T {
  return {...article, createdDate: new Date(Date.parse((article.createdDate as unknown) as string))};
}
