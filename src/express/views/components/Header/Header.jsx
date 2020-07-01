import React from "react";

export function Header() {
  return (
    <header className="header">
      <a className="header__logo logo" href="#">
        <img className="logo__image" src="img/icons/logo-image-only.svg" alt="логотип Тайпотеки" />
        <span className="logo__name">Типотека</span>
      </a>
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
