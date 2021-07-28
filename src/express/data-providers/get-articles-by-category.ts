import {IPaginationOptions} from "../../types/interfaces/pagination-options";
import {CategoryId} from "../../types/category-id";
import {ArticlesByCategory} from "../../types/articles-by-category";
import {APIRoute} from "../../shared/constants/routes/api-route";

import {apiEndpoint, httpProvider} from "./internal";
import {transformDateDto} from "./dtos";

async function getArticlesByCategory({
  offset,
  limit,
  categoryId,
}: Partial<IPaginationOptions> & {categoryId: CategoryId}): Promise<ArticlesByCategory> {
  try {
    const response = await httpProvider().get<ArticlesByCategory>(
      `${apiEndpoint() + APIRoute.CATEGORIES}/${categoryId}`,
      {
        params: {offset, limit},
      },
    );
    return {
      category: response.data.category,
      items: response.data.items.map(transformDateDto),
      totalCount: response.data.totalCount,
    };
  } catch (e) {
    console.error(`Failed to load articles by categoryId "${categoryId}"`);
    return Promise.reject(e);
  }
}

export {getArticlesByCategory};
