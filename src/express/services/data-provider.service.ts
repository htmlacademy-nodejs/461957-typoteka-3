import axios, {AxiosResponse, AxiosStatic} from "axios";

import {HttpCode} from "../../constants";
import {APIRoute} from "../../shared/constants/routes/api-route";
import {ENV} from "../../shared/env/env";
import type {Article, ICreatedDate} from "../../types/article";
import {ArticleId} from "../../types/article-id";
import type {ArticleSearchCollection} from "../../types/article-search-collection";
import type {ArticleValidationResponse} from "../../types/article-validation-response";
import {ArticlesByCategory} from "../../types/articles-by-category";
import {Category} from "../../types/category";
import {CategoryId} from "../../types/category-id";
import {CategoryWithNumbers} from "../../types/category-with-numbers";
import {CommentValidationResponse} from "../../types/comment-validation-response";
import {IArticleCreating} from "../../types/interfaces/article-creating";
import {IArticlePreview} from "../../types/interfaces/article-preview";
import {IArticleAnnounceAndCommentsCount} from "../../types/interfaces/article-announce-and-comments-count";
import {IAuthTokens} from "../../types/interfaces/auth-tokens";
import {IAuthorizationFailed, IAuthorizationSuccess} from "../../types/interfaces/authorization-result";
import {IAuthorsComment} from "../../types/interfaces/authors-comment";
import {ICollection} from "../../types/interfaces/collection";
import {ICommentCreating} from "../../types/interfaces/comment-creating";
import {ICommentPreview} from "../../types/interfaces/comment-preview";
import {ILogin} from "../../types/interfaces/login";
import {IPaginationOptions} from "../../types/interfaces/pagination-options";
import {IUserCreatingDoublePasswords} from "../../types/interfaces/user-creating";
import {IUserPreview} from "../../types/interfaces/user-preview";
import {SignInValidationResponse} from "../../types/sign-in-validation-response";
import {UserId} from "../../types/user-id";
import {UserValidationResponse} from "../../types/user-validation-response";
import {getLogger} from "../logger";

class DataProviderService {
  private readonly requestService: AxiosStatic;
  private readonly apiEndPoint = ENV.API_HOST + `:` + ENV.PORT + APIRoute.API;
  private readonly logger = getLogger();

  constructor() {
    this.requestService = axios;
  }

  public async getArticles({offset, limit}: Partial<IPaginationOptions>): Promise<ICollection<IArticlePreview>> {
    try {
      const response = await this.requestService.get<ICollection<IArticlePreview>>(
        this.apiEndPoint + APIRoute.ARTICLES,
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

  public async getArticlesByUser({
    offset,
    limit,
    authorId,
  }: Partial<IPaginationOptions> & {authorId: UserId}): Promise<ICollection<IArticlePreview>> {
    try {
      const response = await this.requestService.get<ICollection<IArticlePreview>>(
        `${this.apiEndPoint + APIRoute.ARTICLES_BY_AUTHOR}/${authorId}`,
        {
          params: {offset, limit},
        },
      );
      return {
        items: response.data.items.map(transformDate),
        totalCount: response.data.totalCount,
      };
    } catch (e) {
      console.error(`Failed to load articles for user`);
      return Promise.reject(e);
    }
  }

  public async getDiscussedArticles(): Promise<IArticleAnnounceAndCommentsCount[]> {
    try {
      const response = await this.requestService.get<IArticleAnnounceAndCommentsCount[]>(
        `${this.apiEndPoint + APIRoute.ARTICLES_DISCUSSED}`,
      );
      return response.data;
    } catch (e) {
      this.logger.error(`Failed to load the most discussed articles`, e);
      return Promise.reject(e);
    }
  }

  public async createUser(newUser: IUserCreatingDoublePasswords): Promise<void | UserValidationResponse> {
    let response: AxiosResponse<void | UserValidationResponse>;
    try {
      response = await this.requestService.post<UserValidationResponse>(this.apiEndPoint + APIRoute.USERS, newUser);
      if (response && response?.status === HttpCode.CREATED) {
        return Promise.resolve();
      }
      return Promise.reject(`Error during creation the new user`);
    } catch (e) {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (e?.response?.status === HttpCode.BAD_REQUEST) {
        console.error(`Invalid user`);
        return e?.response?.data as UserValidationResponse;
      }
      return Promise.reject(`Error during creation the new article`);
    }
  }

  public async signIn(signIn: ILogin): Promise<IAuthorizationSuccess | IAuthorizationFailed> {
    let response: AxiosResponse<IAuthorizationSuccess>;
    try {
      response = await this.requestService.post<IAuthorizationSuccess>(this.apiEndPoint + APIRoute.LOGIN, signIn);
      if (response && response?.status === HttpCode.OK) {
        return Promise.resolve({
          isSuccess: true,
          payload: {
            accessToken: response.data.payload.accessToken,
            refreshToken: response.data.payload.refreshToken,
          },
        });
      }
      return Promise.reject(`Error during sign in`);
    } catch (e) {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (e?.response?.status === HttpCode.FORBIDDEN) {
        console.error(`Invalid user`);
        return {
          isSuccess: false,
          payload: e?.response?.data as SignInValidationResponse,
        };
      }
      return Promise.reject(`Error during sign in`);
    }
  }

  public async createArticle(
    newArticle: IArticleCreating,
    authToken: string,
  ): Promise<void | ArticleValidationResponse> {
    let response: AxiosResponse<void | ArticleValidationResponse>;
    try {
      response = await this.requestService.post<ArticleValidationResponse>(
        this.apiEndPoint + APIRoute.ARTICLES,
        newArticle,
        getAuthHeader(authToken),
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
      console.error(`Error during creation the new article`);
      return Promise.reject(`Error during creation the new article`);
    }
  }

  public async updateArticle(
    articleId: ArticleId,
    updatingArticle: IArticleCreating,
    authToken: string,
  ): Promise<void | ArticleValidationResponse> {
    try {
      const response = await this.requestService.put<ArticleValidationResponse>(
        `${this.apiEndPoint}/${APIRoute.EDIT_ARTICLE}/${articleId}`,
        updatingArticle,
        getAuthHeader(authToken),
      );
      if (response && response?.status === HttpCode.OK) {
        return Promise.resolve();
      }
      return Promise.reject(`Error during updating the article #${articleId}`);
    } catch (e) {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (e?.response?.status === HttpCode.BAD_REQUEST) {
        console.error(`Invalid article`);
        return e?.response?.data as ArticleValidationResponse;
      }
      console.error(`Error during updating the article #${articleId}`);
      return Promise.reject(`Error during updating the article #${articleId}`);
    }
  }

  public async getArticleById(id: ArticleId): Promise<Article> {
    try {
      const response = await this.requestService.get<Article>(`${this.apiEndPoint + APIRoute.ARTICLES}/${id}`, {});
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
    try {
      const response = await this.requestService.get<ArticlesByCategory>(
        `${this.apiEndPoint + APIRoute.CATEGORIES}/${categoryId}`,
        {
          params: {offset, limit},
        },
      );
      return {
        category: response.data.category,
        items: response.data.items.map(transformDate),
        totalCount: response.data.totalCount,
      };
    } catch (e) {
      console.error(`Failed to load articles by categoryId "${categoryId}"`);
      return Promise.reject(e);
    }
  }

  public async getComments(authToken: string): Promise<IAuthorsComment[]> {
    try {
      const response = await this.requestService.get<IAuthorsComment[]>(
        this.apiEndPoint + APIRoute.USERS_COMMENTS,
        getAuthHeader(authToken),
      );
      return response.data;
    } catch (e) {
      console.error(`Failed to load author's comments`);
      return Promise.reject(e);
    }
  }

  public async getCategories(): Promise<Category[]> {
    try {
      const response = await this.requestService.get<Category[]>(this.apiEndPoint + APIRoute.CATEGORIES, {});
      return response.data;
    } catch (e) {
      console.error(`Failed to load categories`);
      return Promise.reject(e);
    }
  }

  public async getRecentComments(): Promise<ICommentPreview[]> {
    try {
      const response = await this.requestService.get<ICommentPreview[]>(
        this.apiEndPoint + APIRoute.COMMENTS_RECENT,
        {},
      );
      return response.data;
    } catch (e) {
      this.logger.error(`Failed to get recent comments`, e);
      return Promise.reject(`Failed to get recent comments`);
    }
  }

  public async getCategoriesWithNumbers(): Promise<CategoryWithNumbers[]> {
    try {
      const response = await this.requestService.get<CategoryWithNumbers[]>(
        this.apiEndPoint + APIRoute.CATEGORIES_STATISTICS,
        {},
      );
      return response.data;
    } catch (e) {
      console.error(`Failed to load categories with statistics`);
      return Promise.reject(e);
    }
  }

  public async search(query: string): Promise<ArticleSearchCollection> {
    try {
      const response = await this.requestService.get<ArticleSearchCollection>(this.apiEndPoint + APIRoute.SEARCH, {
        params: {
          query,
        },
      });
      return response.data;
    } catch (e) {
      console.error(`Failed to load search response`);
      return Promise.reject(e);
    }
  }

  public async getArticleComments(articleId: ArticleId): Promise<ICommentPreview[]> {
    try {
      const response = await this.requestService.get<ICommentPreview[]>(
        `${this.apiEndPoint + APIRoute.ARTICLE_COMMENTS}/${articleId}`,
        {},
      );
      return response.data.map(transformDate);
    } catch (e) {
      console.error(`Failed to load comments`);
      return Promise.reject(e);
    }
  }

  public async createComment(comment: ICommentCreating, authToken: string): Promise<void | CommentValidationResponse> {
    let response: AxiosResponse<void | CommentValidationResponse>;
    try {
      response = await this.requestService.post<CommentValidationResponse>(
        `${this.apiEndPoint + APIRoute.COMMENTS}`,
        comment,
        getAuthHeader(authToken),
      );
      if (response && response?.status === HttpCode.CREATED) {
        return Promise.resolve();
      }
      return Promise.reject(`Error during creation the new comment`);
    } catch (e) {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (e?.response?.status === HttpCode.BAD_REQUEST) {
        console.error(`Invalid comment`);
        return e?.response?.data as CommentValidationResponse;
      }
      console.error(`Error during creation the new comment`);
      return Promise.reject(`Error during creation the new comment`);
    }
  }

  public async refreshTokens(refreshToken: string): Promise<IAuthTokens> {
    let response: AxiosResponse<IAuthTokens>;
    try {
      response = await this.requestService.post<IAuthTokens>(this.apiEndPoint + APIRoute.REFRESH_TOKENS, {
        refreshToken,
      });
      if (response && response?.status === HttpCode.OK) {
        return Promise.resolve({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      }
      return Promise.reject(`Failed to refresh auth tokens`);
    } catch (e) {
      return Promise.reject(`Invalid refresh token`);
    }
  }

  public async signOut(refreshToken: string, authToken: string): Promise<void> {
    let response: AxiosResponse<void>;
    try {
      response = await this.requestService.post<void>(
        this.apiEndPoint + APIRoute.LOGOUT,
        {refreshToken},
        getAuthHeader(authToken),
      );
      if (response && response?.status === HttpCode.OK) {
        return Promise.resolve();
      }
      return Promise.reject(`Failed to log out`);
    } catch (e) {
      return Promise.reject(`Failed to log out`);
    }
  }

  public async getUserFromToken(authToken: string): Promise<IUserPreview> {
    let response: AxiosResponse<IUserPreview>;
    try {
      response = await this.requestService.get<IUserPreview>(
        this.apiEndPoint + APIRoute.GET_USER,
        getAuthHeader(authToken),
      );
      if (response && response?.status === HttpCode.OK) {
        return Promise.resolve(response.data);
      }
      return Promise.reject(`Failed to get user by accessToken`);
    } catch (e) {
      return Promise.reject(`Invalid accessToken token`);
    }
  }
}

function transformDate<T extends ICreatedDate>(item: T): T {
  return {...item, createdDate: new Date(Date.parse((item.createdDate as unknown) as string))};
}

function getAuthHeader(token: string): Record<string, Record<string, string>> {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return {headers};
}

export {DataProviderService};
