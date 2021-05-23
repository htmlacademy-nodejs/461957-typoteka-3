import React, {FunctionComponent} from "react";
import {Logo} from "../Logo/Logo";
import {ClientRoutes} from "../../../../constants-es6";
import {LogInButton} from "./Buttons/LogInButton/LogInButton";
import {SignUpButton} from "./Buttons/SignUpButton/SignUpButton";

interface Props {}

export const Header: FunctionComponent<Props> = ({}) => {
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
      <a
        className="header__search button button--search"
        href={ClientRoutes.SEARCH.INDEX}
        aria-label="поиск по сайту"
      />
    </header>
  );
};
