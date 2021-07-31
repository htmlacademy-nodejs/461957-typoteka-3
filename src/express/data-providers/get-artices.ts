import {IPaginationOptions} from "../../types/interfaces/pagination-options";
import {ICollection} from "../../types/interfaces/collection";
import {IArticlePreview} from "../../types/interfaces/article-preview";
import {APIRoute} from "../../shared/constants/routes/api-route";
import {IArticlePlain} from "../../types/interfaces/article-plain";
import {ICategories} from "../../types/article";

import {articlePreviewDto} from "./dtos";
import {apiEndpoint, httpProvider} from "./internal";

async function getArticles({offset, limit}: Partial<IPaginationOptions>): Promise<ICollection<IArticlePreview>> {
  try {
    const response = await httpProvider().get<ICollection<IArticlePlain & ICategories>>(
      apiEndpoint() + APIRoute.ARTICLES,
      {
        params: {offset, limit},
      },
    );
    return {
      items: response.data.items.map(articlePreviewDto),
      totalCount: response.data.totalCount,
    };
  } catch (e) {
    console.error(`Failed to load articles`);
    return Promise.reject(e);
  }
}

export {getArticles};
