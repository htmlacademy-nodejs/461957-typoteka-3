import {IPaginationOptions} from "../../types/interfaces/pagination-options";
import {ICollection} from "../../types/interfaces/collection";
import {IArticlePreview} from "../../types/interfaces/article-preview";
import {APIRoute} from "../../shared/constants/routes/api-route";
import {transformDate} from "../models/dto";

import {apiEndpoint, httpProvider} from "./internal";

async function getArticles({offset, limit}: Partial<IPaginationOptions>): Promise<ICollection<IArticlePreview>> {
  try {
    const response = await httpProvider().get<ICollection<IArticlePreview>>(apiEndpoint() + APIRoute.ARTICLES, {
      params: {offset, limit},
    });
    return {
      items: response.data.items.map(transformDate),
      totalCount: response.data.totalCount,
    };
  } catch (e) {
    console.error(`Failed to load articles`);
    return Promise.reject(e);
  }
}

export {getArticles};
