import {DefaultButton} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {ClientRoutes} from "../../../../../../constants-es6";

export const LogInButton: FunctionComponent = () => (
  <DefaultButton href={ClientRoutes.SIGN_IN}>Вход с паролем</DefaultButton>
);
