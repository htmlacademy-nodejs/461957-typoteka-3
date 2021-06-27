import {DefaultButton} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../../../constants-es6";

export const SignUpButton: FunctionComponent = () => (
  <DefaultButton href={ClientRoute.REGISTRATION}>Регистрация</DefaultButton>
);
