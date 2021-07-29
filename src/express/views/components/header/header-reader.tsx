import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../shared/constants/routes/client-route";
import {Avatar} from "../avatar/avatar";
import {Logo} from "../logo/logo";

import {SearchButton} from "./buttons/search-button/search-button";

interface Props {
  firstName: string;
  lastName: string;
  avatar: string;
}

const HeaderReader: FunctionComponent<Props> = ({firstName, lastName, avatar}) => {
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
            <a className="header__exit" href={ClientRoute.SIGN_OUT}>
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

export {HeaderReader};
