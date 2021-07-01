import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../shared/constants/routes/client-route";
import {Avatar} from "../Avatar/Avatar";
import {FabricUIIcon} from "../FabricUIIcon/FabricIcon";
import {Logo} from "../Logo/Logo";

import {NewArticleButton} from "./Buttons/NewArticleButton/NewArticleButton";

interface Props {
  firstName: string;
  lastName: string;
  avatar: string;
}

const HeaderAuthor: FunctionComponent<Props> = ({firstName, lastName, avatar}) => {
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
      <NewArticleButton />
      <div className="header__dropdown">
        <button type="button" className="button button--burger header__burger">
          Открыть меню
        </button>
        <ul className="navigation header__navigation ms-depth-8">
          <li className="navigation__item">
            <a href={ClientRoute.ADMIN.INDEX}>
              <FabricUIIcon size="18" icon={"Articles"} />
              Мои записи
            </a>
          </li>
          <li className="navigation__item">
            <a href={ClientRoute.ADMIN.COMMENTS}>
              <FabricUIIcon size="18" icon="Comment" />
              Комментарии
            </a>
          </li>
          <li className="navigation__item">
            <a href={ClientRoute.SEARCH.INDEX}>
              <FabricUIIcon size="18" icon="Search" />
              Поиск
            </a>
          </li>
          <li className="navigation__item">
            <a href={ClientRoute.SIGN_OUT}>
              <FabricUIIcon size="18" icon="SignOut" />
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export {
  HeaderAuthor,
};
