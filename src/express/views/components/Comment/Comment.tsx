import React, {FunctionComponent} from "react";
import type {ArticleComment} from "../../../../types/article-comment";

interface CommentProps extends Partial<ArticleComment> {}

export const Comment: FunctionComponent<CommentProps> = ({text}) => (
  <li className="comments__comment">
    <div className="comments__avatar avatar">
      <img src="https://via.placeholder.com/50x50.webp" alt="аватар пользователя" />
    </div>
    <div className="comments__text">
      <div className="comments__head">
        <p>Евгений Петров •</p>
        <time className="comments__date" dateTime="2019-03-21T20:33">
          21.03.2019, 20:33
        </time>
      </div>
      <p className="comments__message">{text}</p>
    </div>
  </li>
);
