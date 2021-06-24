import React, {FunctionComponent} from "react";
import {LogInButton} from "./Buttons/LogInButton/LogInButton";
import {SignUpButton} from "./Buttons/SignUpButton/SignUpButton";
import {SearchButton} from "./Buttons/SearchButton/SearchButton";

export const Header500: FunctionComponent = () => (
  <header className="header header--error">
    <a className="header__logo header__logo--500 logo" href="#">
      <img src="img/icons/logo.svg" alt="логотип Тайпотеки" />
    </a>
    <SignUpButton />
    <LogInButton />
    <SearchButton />
  </header>
);
