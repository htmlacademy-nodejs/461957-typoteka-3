import axios, {AxiosResponse, AxiosStatic} from "axios";
import type {Article, ICreatedDate} from "../../types/article";
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
import {IArticleCreating} from "../../types/interfaces/article-creating";
import {ICommentCreating} from "../../types/interfaces/comment-creating";
import {CommentValidationResponse} from "../../types/comment-validation-response";

export class DataProviderService {
  private requestService: AxiosStatic;
  private apiEndPoint = ENV.API_HOST + `:` + ENV.PORT + APIRoutes.API;

  constructor() {
    this.requestService = axios;
  }

  public async getArticles({offset, limit}: Partial<IPaginationOptions>): Promise<ICollection<IArticlePreview>> {
    try {
      const response = await this.requestService.get<ICollection<IArticlePreview>>(
        this.apiEndPoint + APIRoutes.ARTICLES,
        {
          params: {offset, limit},
        },
      );
      return {
        items: response.data.items.map(transformDate),
        totalCount: response.data.totalCount,
      };
    } catch (e) {
      console.error(`Failed to load articles`);
      return Promise.reject(e);
    }
  }

  public async createArticle(newArticle: IArticleCreating): Promise<void | ArticleValidationResponse> {
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

  public async updateArticle(
    articleId: ArticleId,
    updatingArticle: IArticleCreating,
  ): Promise<void | ArticleValidationResponse> {
    let response: AxiosResponse<void | ArticleValidationResponse>;
    try {
      response = await this.requestService.put<ArticleValidationResponse>(
        `${this.apiEndPoint}/${APIRoutes.EDIT_ARTICLE}/${articleId}`,
        updatingArticle,
      );
      if (response && response?.status === HttpCode.OK) {
        return Promise.resolve();
      }
      return Promise.reject(`Error during updating the article #${articleId}`);
    } catch (e) {
      console.error(`Error during updating the article #${articleId}`);
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (e?.response?.status === HttpCode.BAD_REQUEST) {
        console.error(`Invalid article`);
        return e?.response?.data as ArticleValidationResponse;
      }
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */
      console.error(`Error during updating the article #${articleId}`);
      return Promise.reject(`Error during updating the article #${articleId}`);
    }
  }

  public async getArticleById(id: ArticleId): Promise<Article> {
    try {
      const response = await this.requestService.get<Article>(`${this.apiEndPoint + APIRoutes.ARTICLES}/${id}`, {});
      return transformDate(response.data);
    } catch (e) {
      console.error(`Failed to load article by id "${id}"`);
      return Promise.reject(e);
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
      // TODO: replace with Promise.reject()
      return null;
    }
  }

  public async getComments(quantityOfArticles: number): Promise<ArticleComment[]> {
    try {
      const {items: articlesList} = await this.getArticles({limit: 100, offset: 0});
      const comments = await Promise.all(
        articlesList.slice(0, quantityOfArticles).map(article => this.getArticleComments(article.id)),
      );
      return comments.flat(1);
    } catch (e) {
      console.error(`Failed to load articles or comments`);
      return Promise.reject(e);
    }
  }

  public async getCategories(): Promise<Category[]> {
    try {
      const response = await this.requestService.get<Category[]>(this.apiEndPoint + APIRoutes.CATEGORIES, {});
      return response.data;
    } catch (e) {
      console.error(`Failed to load categories`);
      return Promise.reject(e);
    }
  }

  public async getCategoriesWithNumbers(): Promise<CategoryWithNumbers[]> {
    try {
      const response = await this.requestService.get<CategoryWithNumbers[]>(
        this.apiEndPoint + APIRoutes.CATEGORIES_STATISTICS,
        {},
      );
      return response.data;
    } catch (e) {
      console.error(`Failed to load categories with statistics`);
      return Promise.reject(e);
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
      // TODO: replace with Promise.reject()
      return null;
    }
  }

  public async getArticleComments(articleId: ArticleId): Promise<ArticleComment[]> {
    try {
      const response = await this.requestService.get<ArticleComment[]>(
        `${this.apiEndPoint + APIRoutes.ARTICLES}/${articleId}${APIRoutes.COMMENTS}`,
        {},
      );
      return response.data.map(transformDate);
    } catch (e) {
      console.error(`Failed to load comments`);
      return Promise.reject(e);
    }
  }

  public async createComment(
    articleId: ArticleId,
    comment: ICommentCreating,
  ): Promise<void | CommentValidationResponse> {
    let response: AxiosResponse<void | CommentValidationResponse>;
    try {
      response = await this.requestService.post<CommentValidationResponse>(
        `${this.apiEndPoint}/${APIRoutes.ARTICLES}/${articleId}/comments`,
        comment,
      );
      if (response && response?.status === HttpCode.CREATED) {
        return Promise.resolve();
      }
      return Promise.reject(`Error during creation the new comment`);
    } catch (e) {
      console.error(`Error during creation the new comment`);
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (e?.response?.status === HttpCode.BAD_REQUEST) {
        console.error(`Invalid article`);
        return e?.response?.data as CommentValidationResponse;
      }
      /* eslint-enable @typescript-eslint/no-unsafe-member-access */
      console.error(`Error during creation the new comment`);
      return Promise.reject(`Error during creation the new comment`);
    }
  }
}

function transformDate<T extends ICreatedDate>(item: T): T {
  return {...item, createdDate: new Date(Date.parse((item.createdDate as unknown) as string))};
}
