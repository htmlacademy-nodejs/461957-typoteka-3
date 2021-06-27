import {DefaultButton} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../../../constants-es6";

export const LogInButton: FunctionComponent = () => (
  <DefaultButton href={ClientRoute.SIGN_IN}>Вход с паролем</DefaultButton>
);
