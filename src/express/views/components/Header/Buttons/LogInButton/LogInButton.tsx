import {ClientRoutes} from "../../../../../../constants-es6";
import React from "react";

export const LogInButton = () => (
  <a className="header__enter" href={ClientRoutes.SIGN_IN}>
    Вход с паролем
  </a>
);
