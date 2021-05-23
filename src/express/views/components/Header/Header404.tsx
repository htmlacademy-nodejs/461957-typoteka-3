import React, {FunctionComponent} from "react";
import {LogInButton} from "./Buttons/LogInButton/LogInButton";
import {SignUpButton} from "./Buttons/SignUpButton/SignUpButton";

interface Header404Props {}

export const Header404: FunctionComponent<Header404Props> = () => (
  <header className="header header--error">
    <a className="header__logo header__logo--404 logo" href="#">
      <img src="img/icons/logo.svg" alt="логотип Тайпотеки" />
    </a>
    <SignUpButton />
    <LogInButton />
    <a className="header__search button button--search" href="#" aria-label="поиск по сайту" />
  </header>
);
