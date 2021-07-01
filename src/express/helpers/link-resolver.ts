import {ClientRoute} from "../../shared/constants/routes/client-route";
import {ArticleId} from "../../types/article-id";

function getArticleLink(articleId: ArticleId): string {
  return `${ClientRoute.ARTICLES.INDEX}/${articleId}`;
}

export {
  getArticleLink,
};
