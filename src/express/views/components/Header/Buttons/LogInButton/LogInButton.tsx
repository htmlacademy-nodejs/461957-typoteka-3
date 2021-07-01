import {DefaultButton} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../../../shared/constants/routes/client-route";

const LogInButton: FunctionComponent = () => (
  <DefaultButton href={ClientRoute.SIGN_IN}>Вход с паролем</DefaultButton>
);

export {
  LogInButton,
};
