import React, {FunctionComponent} from "react";

import {ClientRoutes} from "../../../../constants-es6";
import {Avatar} from "../Avatar/Avatar";
import {Logo} from "../Logo/Logo";

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
      <Avatar avatar={avatar} cssClass="header__avatar" />
      <SearchButton />
    </header>
  );
};
