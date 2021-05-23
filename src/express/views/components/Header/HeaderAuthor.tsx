import React, {FunctionComponent} from "react";
import {Logo} from "../Logo/Logo";
import {ClientRoutes} from "../../../../constants-es6";

interface Props {
  firstName: string;
  lastName: string;
  avatar: string;
}

export const HeaderAuthor: FunctionComponent<Props> = ({firstName, lastName, avatar}) => {
  return (
    <header className="header">
      <Logo />
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__list-item">
            <p>
              {firstName} {lastName}
            </p>
          </li>
        </ul>
      </nav>
      <span className="header__avatar avatar">
        <img src={avatar ? avatar : "https://via.placeholder.com/50x50.webp"} alt="аватар пользователя" />
      </span>
      <a href={ClientRoutes.ARTICLES.ADD} className="button button--colored header__button-new">
        Новая запись
      </a>
      <div className="header__dropdown">
        <button type="button" className="button button--burger header__burger">
          Открыть меню
        </button>
        <ul className="navigation header__navigation">
          <li className="navigation__item">
            <a href={ClientRoutes.ADMIN.INDEX}>Мои записи</a>
          </li>
          <li className="navigation__item">
            <a href={ClientRoutes.ADMIN.COMMENTS}>Комментарии</a>
          </li>
          <li className="navigation__item">
            <a href={ClientRoutes.SEARCH.INDEX}>Поиск</a>
          </li>
          <li className="navigation__item">
            <a href={ClientRoutes.SIGN_OUT}>Выйти</a>
          </li>
        </ul>
      </div>
    </header>
  );
};
