import {DefaultButton} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {ClientRoutes} from "../../../../../../constants-es6";

export const SignUpButton: FunctionComponent = () => (
  <DefaultButton href={ClientRoutes.REGISTRATION}>Регистрация</DefaultButton>
);
