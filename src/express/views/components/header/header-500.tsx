import React, {FunctionComponent} from "react";

import {LogInButton} from "./buttons/log-in-button/log-in-button";
import {SearchButton} from "./buttons/search-button/search-button";
import {SignUpButton} from "./buttons/sign-up-button/sign-up-button";

const Header500: FunctionComponent = () => (
  <header className="header header--error">
    <a className="header__logo header__logo--500 logo" href="#">
      <img src="img/icons/logo.svg" alt="логотип Тайпотеки" />
    </a>
    <SignUpButton />
    <LogInButton />
    <SearchButton />
  </header>
);

export {Header500};
