import {IPaginationOptions} from "../../types/interfaces/pagination-options";
import {UserId} from "../../types/user-id";
import {ICollection} from "../../types/interfaces/collection";
import {IArticlePreview} from "../../types/interfaces/article-preview";
import {IArticlePlain} from "../../types/interfaces/article-plain";
import {APIRoute} from "../../shared/constants/routes/api-route";

import {apiEndpoint, httpProvider} from "./internal";
import {articlePreviewDto} from "./dtos";

async function getArticlesByUser({
  offset,
  limit,
  authorId,
}: Partial<IPaginationOptions> & {authorId: UserId}): Promise<ICollection<IArticlePreview>> {
  try {
    const response = await httpProvider().get<ICollection<IArticlePlain>>(
      `${apiEndpoint() + APIRoute.ARTICLES_BY_AUTHOR}/${authorId}`,
      {
        params: {offset, limit},
      },
    );
    return {
      items: response.data.items.map(articlePreviewDto),
      totalCount: response.data.totalCount,
    };
  } catch (e) {
    console.error(`Failed to load articles for user`);
    return Promise.reject(e);
  }
}

export {getArticlesByUser};
