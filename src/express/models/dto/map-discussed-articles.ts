import {IArticleTitleAndCommentsCount} from "../../../types/interfaces/article-title-and-comments-count";
import {getArticleLink} from "../../helpers/link-resolver";
import {HotProps} from "../../views/components/Hot/Hot";

function mapDiscussedArticles(items: IArticleTitleAndCommentsCount[]): HotProps[] {
  return items.map(item => ({
    title: item.title,
    count: item.commentsCount,
    link: getArticleLink(item.id),
  }));
}

export {mapDiscussedArticles};
