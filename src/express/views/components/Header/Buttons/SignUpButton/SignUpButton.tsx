import {ClientRoutes} from "../../../../../../constants-es6";
import React from "react";

export const SignUpButton = () => (
  <a className="header__registration" href={ClientRoutes.REGISTRATION}>
    Регистрация
  </a>
);
