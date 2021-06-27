import {ClientRoute} from "../../shared/constants/routes/client-route";
import {ArticleId} from "../../types/article-id";

export function getArticleLink(articleId: ArticleId): string {
  return `${ClientRoute.ARTICLES.INDEX}/${articleId}`;
}
