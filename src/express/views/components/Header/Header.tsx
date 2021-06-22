import React, {FunctionComponent} from "react";
import {Logo} from "../Logo/Logo";
import {LogInButton} from "./Buttons/LogInButton/LogInButton";
import {SignUpButton} from "./Buttons/SignUpButton/SignUpButton";
import {SearchButton} from "./Buttons/SearchButton/SearchButton";

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
      <SearchButton />
    </header>
  );
};
