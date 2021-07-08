import {IArticleAnnounceAndCommentsCount} from "../../../types/interfaces/article-announce-and-comments-count";
import {getArticleLink} from "../../helpers/link-resolver";
import {HotProps} from "../../views/components/Hot/Hot";

function mapDiscussedArticles(items: IArticleAnnounceAndCommentsCount[]): HotProps[] {
  return items.map(item => ({
    announce: item.announce,
    count: item.commentsCount,
    link: getArticleLink(item.id),
  }));
}

export {mapDiscussedArticles};
