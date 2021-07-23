import {ICreatedDate, ILink} from "../../../types/article";
import {IUserPresentation} from "../../../types/interfaces/user-presentation";

interface ICommentByAuthor extends ICreatedDate, ILink {
  text: string;
  articleTitle: string;
  user: IUserPresentation;
}

export {
  ICommentByAuthor,
};
