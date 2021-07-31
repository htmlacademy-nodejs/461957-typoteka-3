import {IPaginationOptions} from "../../types/interfaces/pagination-options";
import {CategoryId} from "../../types/category-id";
import {APIRoute} from "../../shared/constants/routes/api-route";
import {ICollection} from "../../types/interfaces/collection";
import {IArticlePlain} from "../../types/interfaces/article-plain";
import {ICategory} from "../../types/interfaces/category";
import {IArticlePreview} from "../../types/interfaces/article-preview";

import {apiEndpoint, httpProvider} from "./internal";
import {articlePreviewDto} from "./dtos";

async function getArticlesByCategory({
  offset,
  limit,
  categoryId,
}: Partial<IPaginationOptions> & {categoryId: CategoryId}): Promise<ICategory & ICollection<IArticlePreview>> {
  try {
    const response = await httpProvider().get<ICategory & ICollection<IArticlePlain>>(
      `${apiEndpoint() + APIRoute.CATEGORIES}/${categoryId}`,
      {
        params: {offset, limit},
      },
    );
    return {
      category: response.data.category,
      items: response.data.items.map(articlePreviewDto),
      totalCount: response.data.totalCount,
    };
  } catch (e) {
    console.error(`Failed to load articles by categoryId "${categoryId}"`);
    return Promise.reject(e);
  }
}

export {getArticlesByCategory};
