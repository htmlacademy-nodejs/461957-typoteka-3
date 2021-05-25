import React, {FunctionComponent} from "react";
import {Logo} from "../Logo/Logo";
import {ClientRoutes} from "../../../../constants-es6";
import {FabricUIIcon} from "../FabricUIIcon/FabricIcon";
import {Avatar} from "../Avatar/Avatar";

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
      <Avatar avatar={avatar} cssClass="header__avatar" />
      <a href={ClientRoutes.ARTICLES.ADD} className="button button--colored header__button-new">
        <FabricUIIcon size="18" icon="Add" />
        Новая запись
      </a>
      <div className="header__dropdown">
        <button type="button" className="button button--burger header__burger">
          Открыть меню
        </button>
        <ul className="navigation header__navigation ms-depth-8">
          <li className="navigation__item">
            <a href={ClientRoutes.ADMIN.INDEX}>
              <FabricUIIcon size="18" icon={"Articles"} />
              Мои записи
            </a>
          </li>
          <li className="navigation__item">
            <a href={ClientRoutes.ADMIN.COMMENTS}>
              <FabricUIIcon size="18" icon="Comment" />
              Комментарии
            </a>
          </li>
          <li className="navigation__item">
            <a href={ClientRoutes.SEARCH.INDEX}>
              <FabricUIIcon size="18" icon="Search" />
              Поиск
            </a>
          </li>
          <li className="navigation__item">
            <a href={ClientRoutes.SIGN_OUT}>
              <FabricUIIcon size="18" icon="SignOut" />
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
