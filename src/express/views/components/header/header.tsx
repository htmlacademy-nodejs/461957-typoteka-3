import React, {FunctionComponent} from "react";

import {Logo} from "../logo/logo";

import {LogInButton} from "./buttons/log-in-button/log-in-button";
import {SearchButton} from "./buttons/search-button/search-button";
import {SignUpButton} from "./buttons/sign-up-button/sign-up-button";

const Header: FunctionComponent = ({}) => {
  return (
    <header className="header">
      <Logo />
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__list-item">
            <SignUpButton />
          </li>
          <li className="header__list-item">
            <LogInButton />
          </li>
        </ul>
      </nav>
      <SearchButton />
    </header>
  );
};

export {Header};
