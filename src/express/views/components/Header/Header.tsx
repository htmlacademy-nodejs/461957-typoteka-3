import React, {FunctionComponent} from "react";
import {Logo} from "../Logo/Logo";
import {ClientRoutes} from "../../../../constants-es6";

interface Props {}

export const Header: FunctionComponent<Props> = ({}) => {
  return (
    <header className="header">
      <Logo />
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__list-item">
            <a className="header__registration" href={ClientRoutes.REGISTRATION}>
              Регистрация
            </a>
          </li>
          <li className="header__list-item">
            <a className="header__enter" href={ClientRoutes.SIGN_IN}>
              Вход с паролем
            </a>
          </li>
        </ul>
      </nav>
      <a
        className="header__search button button--search"
        href={ClientRoutes.SEARCH.INDEX}
        aria-label="поиск по сайту"
      />
    </header>
  );
};
