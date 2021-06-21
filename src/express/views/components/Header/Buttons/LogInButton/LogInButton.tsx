import {ClientRoutes} from "../../../../../../constants-es6";
import React from "react";
import {DefaultButton} from "@fluentui/react";

export const LogInButton = () => <DefaultButton href={ClientRoutes.SIGN_IN}>Вход с паролем</DefaultButton>;
