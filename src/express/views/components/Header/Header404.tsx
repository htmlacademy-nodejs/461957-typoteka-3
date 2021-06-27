import React, {FunctionComponent} from "react";

import {LogInButton} from "./Buttons/LogInButton/LogInButton";
import {SearchButton} from "./Buttons/SearchButton/SearchButton";
import {SignUpButton} from "./Buttons/SignUpButton/SignUpButton";

export const Header404: FunctionComponent = () => (
  <header className="header header--error">
    <a className="header__logo header__logo--404 logo" href="#">
      <img src="img/icons/logo.svg" alt="логотип Тайпотеки" />
    </a>
    <SignUpButton />
    <LogInButton />
    <SearchButton />
  </header>
);
