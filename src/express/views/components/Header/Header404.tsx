import React from "react";
import {FunctionComponent} from "react";

interface Header404Props {}

export const Header404: FunctionComponent<Header404Props> = () => (
  <header className="header header--error">
    <a className="header__logo header__logo--404 logo" href="#">
      <img src="img/icons/logo.svg" alt="логотип Тайпотеки" />
    </a>
    <a className="header__registration" href="#">
      Регистрация
    </a>
    <a className="header__enter" href="#">
      Вход с паролем
    </a>
    <a className="header__search button button--search" href="#" aria-label="поиск по сайту" />
  </header>
);
