import {ICreatedDate, ILink} from "../article";

import {IUserPresentation} from "./user-presentation";

interface ICommentByAuthor extends ICreatedDate, ILink {
  text: string;
  articleTitle: string;
  user: IUserPresentation;
}

export {ICommentByAuthor};
