import React, {FunctionComponent} from "react";
import {Logo} from "../Logo/Logo";
import {ClientRoutes} from "../../../../constants-es6";
import {SearchButton} from "./Buttons/SearchButton/SearchButton";

interface Props {
  firstName: string;
  lastName: string;
  avatar: string;
}

export const HeaderReader: FunctionComponent<Props> = ({firstName, lastName, avatar}) => {
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
          <li className="header__list-item">
            <a className="header__exit" href={ClientRoutes.SIGN_OUT}>
              Выйти
            </a>
          </li>
        </ul>
      </nav>
      <a className="header__avatar avatar" href={ClientRoutes.ADMIN.INDEX}>
        <img src={avatar ? avatar : "https://via.placeholder.com/50x50.webp"} alt="аватар пользователя" />
      </a>
      <SearchButton />
    </header>
  );
};
