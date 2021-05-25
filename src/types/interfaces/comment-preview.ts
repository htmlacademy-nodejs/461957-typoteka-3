import {ICommentCreating} from "./comment-creating";
import {ICommentId} from "./comment-id";
import {IUserPresentation} from "./user-presentation";

export interface ICommentPreview extends ICommentCreating, ICommentId {
  user: IUserPresentation;
}
