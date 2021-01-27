import {ArticleId} from "../../types/article-id";
import {ClientRoutes} from "../../constants-es6";

export function getArticleLink(articleId: ArticleId): string {
  return `${ClientRoutes.ARTICLES.INDEX}/${articleId}`;
}
