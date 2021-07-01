import React, {FunctionComponent} from "react";

import {ICommentByAuthor} from "../../../models/interfaces/comment-by-author";
import {Avatar} from "../Avatar/Avatar";

const PublicationComment: FunctionComponent<ICommentByAuthor> = ({
  text,
  link,
  user,
  createdDate,
  articleTitle,
}) => (
  <div className="authors-comment">
    <div className="authors-comment__content">
      <div className="publication__header">
        <Avatar avatar={user.avatar} size="small" cssClass="publication__list-image" />
        <b className="publication__list-name">
          {user.firstName} {user.lastName}
        </b>
        <time className="publication__item-time" dateTime={createdDate.toISOString()}>
          {createdDate.toLocaleString()}
        </time>
      </div>
      <span className="publication__item-text">{text}</span>
      <a className="publication__text-strong" href={link}>
        {articleTitle}
      </a>
    </div>
    <button className="button button--close-item" type="button">
      <span className="visually-hidden">Закрыть строку списка</span>
    </button>
  </div>
);

export {
  PublicationComment,
};
