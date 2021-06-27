import {DefaultButton} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../../../shared/constants/routes/client-route";

export const SignUpButton: FunctionComponent = () => (
  <DefaultButton href={ClientRoute.REGISTRATION}>Регистрация</DefaultButton>
);
