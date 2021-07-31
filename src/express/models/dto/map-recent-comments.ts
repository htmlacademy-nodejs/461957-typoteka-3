import {ICommentPreview} from "../../../types/interfaces/comment-preview";
import {getArticleLink} from "../../helpers/link-resolver";
import {LastProps} from "../../views/components/last/last";

function mapRecentComments(items: ICommentPreview[]): LastProps[] {
  return items.map(comment => ({
    title: comment.text,
    link: getArticleLink(comment.articleId),
    avatar: comment.user.avatar,
    firstName: comment.user.firstName,
    lastName: comment.user.lastName,
  }));
}

export {mapRecentComments};
