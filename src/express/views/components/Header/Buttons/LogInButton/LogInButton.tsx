import {ClientRoutes} from "../../../../../../constants-es6";
import React, {FunctionComponent} from "react";
import {DefaultButton} from "@fluentui/react";

export const LogInButton: FunctionComponent = () => (
  <DefaultButton href={ClientRoutes.SIGN_IN}>Вход с паролем</DefaultButton>
);
