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
import {IPaginationOptions} from "../../types/interfaces/pagination-options";
import {ICollection} from "../../types/interfaces/collection";

export class DataProviderService {
  private requestService: AxiosStatic;
  private apiEndPoint = ENV.API_HOST + `:` + ENV.PORT + APIRoutes.API;

  constructor() {
    this.requestService = axios;
  }

  public async getArticles({offset, limit}: Partial<IPaginationOptions>): Promise<ICollection<IArticlePreview>> {
    let response: AxiosResponse<ICollection<IArticlePreview>>;
    try {
      response = await this.requestService.get<ICollection<IArticlePreview>>(this.apiEndPoint + APIRoutes.ARTICLES, {
        params: {offset, limit},
      });
    } catch (e) {
      console.error(`error`, e);
    }
    if (response && response.status === 200) {
      return {
        items: response.data.items.map(transformDate),
        totalCount: response.data.totalCount,
      };
    } else {
      console.error(response.data);
      return null;
    }
  }

  public async createArticle(newArticle: NewArticle): Promise<void | ArticleValidationResponse> {
    let response: AxiosResponse<void | ArticleValidationResponse>;
    try {
      response = await this.requestService.post<ArticleValidationResponse>(
        this.apiEndPoint + APIRoutes.ARTICLES,
        newArticle,
      );
      if (response && response?.status === HttpCode.CREATED) {
        return Promise.resolve();
      }
      return Promise.reject(`Error during creation the new article`);
    } catch (e) {
      console.error(`Error during creation the new article`);
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (e?.response?.status === HttpCode.BAD_REQUEST) {
        console.error(`Invalid article`);
        return e?.response?.data as ArticleValidationResponse;
      }
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */
      console.error(`Error during creation the new article`);
      return Promise.reject(`Error during creation the new article`);
    }
  }

  public async getArticleById(id: ArticleId): Promise<Article> {
    let response: AxiosResponse<Article>;
    try {
      response = await this.requestService.get<Article>(`${this.apiEndPoint + APIRoutes.ARTICLES}/${id}`, {});
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

  public async getArticlesByCategoryId({
    offset,
    limit,
    categoryId,
  }: Partial<IPaginationOptions> & {categoryId: CategoryId}): Promise<ArticlesByCategory> {
    let response: AxiosResponse<ArticlesByCategory>;
    try {
      response = await this.requestService.get<ArticlesByCategory>(
        `${this.apiEndPoint + APIRoutes.CATEGORIES}/${categoryId.toString(10)}`,
        {
          params: {offset, limit},
        },
      );
    } catch (e) {
      console.error(`Failed to load articles by categoryId "${categoryId}"`, e);
    }
    if (response && response.status === 200) {
      return {
        category: response.data.category,
        items: response.data.items.map(transformDate),
        totalCount: response.data.totalCount,
      };
    } else {
      console.error(response.data);
      return null;
    }
  }

  public async getComments(quantityOfArticles: number): Promise<ArticleComment[]> {
    const {items: articlesList} = await this.getArticles({limit: 100, offset: 0});
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
    try {
      const response: AxiosResponse<Category[]> = await this.requestService.get<Category[]>(
        this.apiEndPoint + APIRoutes.CATEGORIES,
        {},
      );
      return response.data;
    } catch (e) {
      console.error(`Failed to load categories`);
      return Promise.reject(e);
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
