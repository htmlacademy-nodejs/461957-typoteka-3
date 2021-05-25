import React, {FunctionComponent} from "react";
import {ICreatedDate} from "../../../../types/article";
import {IUserPresentation} from "../../../../types/interfaces/user-presentation";

interface CommentProps extends ICreatedDate {
  text: string;
  user: IUserPresentation;
}

export const Comment: FunctionComponent<CommentProps> = ({text, createdDate, user}) => (
  <li className="comments__comment">
    <div className="comments__avatar avatar">
      <img src={user.avatar ? user.avatar : "https://via.placeholder.com/50x50.webp"} alt="аватар пользователя" />
    </div>
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
