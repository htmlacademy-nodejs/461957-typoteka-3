import {ICommentPreview} from "../../../types/interfaces/comment-preview";
import {getArticleLink} from "../../helpers/link-resolver";
import {LastProps} from "../../views/components/Last/Last";

function mapRecentComments(items: ICommentPreview[]): LastProps[] {
  return items.map(comment => ({
    title: comment.text,
    link: getArticleLink(comment.id),
    avatar: comment.user.avatar,
    firstName: comment.user.firstName,
    lastName: comment.user.lastName,
  }));
}

export {mapRecentComments};
