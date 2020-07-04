import React from "react";
import {Logo} from "../Logo/Logo";

export function Header() {
  return (
    <header className="header">
      <Logo />
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__list-item">
            <a className="header__registration" href="#">
              Регистрация
            </a>
          </li>
          <li className="header__list-item">
            <a className="header__enter" href="#">
              Вход с паролем
            </a>
          </li>
        </ul>
      </nav>
      <a className="header__search button button--search" href="#" aria-label="поиск по сайту"></a>
    </header>
  );
}
