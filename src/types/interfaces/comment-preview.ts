import {ICommentCreating} from "./comment-creating";
import {ICommentId} from "./comment-id";
import {IUserPresentation} from "./user-presentation";

interface ICommentPreview extends ICommentCreating, ICommentId {
  user: IUserPresentation;
}

export {
  ICommentPreview,
};
