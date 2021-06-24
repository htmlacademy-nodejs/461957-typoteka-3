import {ClientRoutes} from "../../../../../../constants-es6";
import React, {FunctionComponent} from "react";
import {DefaultButton} from "@fluentui/react";

export const SignUpButton: FunctionComponent = () => (
  <DefaultButton href={ClientRoutes.REGISTRATION}>Регистрация</DefaultButton>
);
