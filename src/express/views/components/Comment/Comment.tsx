import React, {FunctionComponent} from "react";
import {ICreatedDate} from "../../../../types/article";

interface CommentProps extends ICreatedDate {
  text: string;
}

export const Comment: FunctionComponent<CommentProps> = ({text, createdDate}) => (
  <li className="comments__comment">
    <div className="comments__avatar avatar">
      <img src="https://via.placeholder.com/50x50.webp" alt="аватар пользователя" />
    </div>
    <div className="comments__text">
      <div className="comments__head">
        <p>Евгений Петров •</p>
        <time className="comments__date" dateTime={createdDate.toISOString()}>
          {createdDate.toLocaleString()}
        </time>
      </div>
      <p className="comments__message">{text}</p>
    </div>
  </li>
);
