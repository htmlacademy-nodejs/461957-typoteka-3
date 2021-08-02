import {AxiosError, AxiosResponse} from "axios";

import {IArticleCreating} from "../../types/interfaces/article-creating";
import {ArticleValidationResponse} from "../../types/article-validation-response";
import {APIRoute} from "../../shared/constants/routes/api-route";
import {HttpCode} from "../../constants";

import {apiEndpoint, getAuthHeader, httpProvider} from "./internal";

async function createArticle(
  newArticle: IArticleCreating,
  authToken: string,
): Promise<void | ArticleValidationResponse> {
  let response: AxiosResponse<void | ArticleValidationResponse>;
  try {
    response = await httpProvider().post<ArticleValidationResponse>(
      apiEndpoint() + APIRoute.ARTICLES,
      newArticle,
      getAuthHeader(authToken),
    );
    if (response && response?.status === HttpCode.CREATED) {
      return Promise.resolve();
    }
    return Promise.reject(`Error during creation the new article`);
  } catch (e) {
    console.error(`Error during creation the new article`);
    if ((e as AxiosError).response.status === HttpCode.BAD_REQUEST) {
      console.error(`Invalid article`);
      return (e as AxiosError).response?.data as ArticleValidationResponse;
    }
    console.error(`Error during creation the new article`);
    return Promise.reject(`Error during creation the new article`);
  }
}

export {createArticle};
