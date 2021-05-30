import React, {FunctionComponent} from "react";
import {ILink} from "../../../../types/article";

export interface PublicationCommentProps extends ILink {
  text: string;
}

export const PublicationComment: FunctionComponent<PublicationCommentProps> = ({text, link}) => (
  <a href={link}>
    <div className="publication__header">
      <img
        className="publication__list-image"
        src="img/avatar-small-2.png"
        width="20"
        height="20"
        alt="Аватар пользователя"
      />
      <b className="publication__list-name">Александр Петров</b>
      <time className="publication__item-time" dateTime="2019-03-21T20:33">
        21.03.2019, 20:33
      </time>
    </div>
    <span className="publication__item-text">{text}</span>
    <p className="publication__text-strong">
      «Яндекс.Метрика» запустила бесплатный сервис для оценки эффективности баннеров и видеорекламы в реальном времени
    </p>
    <button className="publication__button button button--close-item" type="button">
      <span className="visually-hidden">Закрыть строку списка</span>
    </button>
  </a>
);
