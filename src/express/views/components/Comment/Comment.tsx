import React, {FunctionComponent} from "react";

import {ICreatedDate} from "../../../../types/article";
import {IUserPresentation} from "../../../../types/interfaces/user-presentation";
import {Avatar} from "../Avatar/Avatar";

interface CommentProps extends ICreatedDate {
  text: string;
  user: IUserPresentation;
}

const Comment: FunctionComponent<CommentProps> = ({text, createdDate, user}) => (
  <li className="comments__comment">
    <Avatar avatar={user.avatar} cssClass="comments__avatar" />
    <div className="comments__text">
      <div className="comments__head">
        <p>
          {user.firstName} {user.lastName} •
        </p>
        <time className="comments__date" dateTime={createdDate.toISOString()}>
          {createdDate.toLocaleString()}
        </time>
      </div>
      <p className="comments__message">{text}</p>
    </div>
  </li>
);

export {
  Comment,
};
