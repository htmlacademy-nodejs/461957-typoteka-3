import {ArticleId} from "../../types/article-id";
import {ClientRoute} from "../../constants-es6";

export function getArticleLink(articleId: ArticleId): string {
  return `${ClientRoute.ARTICLES.INDEX}/${articleId}`;
}
