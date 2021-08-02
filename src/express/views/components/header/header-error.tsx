import React, {FunctionComponent} from "react";

import {LogInButton} from "./buttons/log-in-button/log-in-button";
import {SearchButton} from "./buttons/search-button/search-button";
import {SignUpButton} from "./buttons/sign-up-button/sign-up-button";

type Error = `404` | `500`;

interface Props {
  type: Error;
}

const getHeaderClassName = (type: Error): string => {
  switch (type) {
    case "404":
      return `header__logo--404`;
    case "500":
      return `header__logo--500`;
    default:
      return ``;
  }
};

const HeaderError: FunctionComponent<Props> = ({type}) => (
  <header className="header header--error">
    <a className={"header__logo logo" + getHeaderClassName(type)} href="#">
      <img src="img/icons/logo.svg" alt="логотип Тайпотеки" />
    </a>
    <SignUpButton />
    <LogInButton />
    <SearchButton />
  </header>
);

export {HeaderError};
