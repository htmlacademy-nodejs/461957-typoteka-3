import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../shared/constants/routes/client-route";

type LogoMode = "default" | "error404" | "error500";

interface LogoProps {
  mode?: LogoMode;
}

const logoCssClasses: {[key in LogoMode]: string} = {
  default: "header__logo logo",
  error404: "header__logo header__logo--404 logo",
  error500: "header__logo header__logo--500 logo",
};

export const Logo: FunctionComponent<LogoProps> = ({mode}) => (
  <a className={logoCssClasses[mode ?? "default"]} href={ClientRoute.INDEX}>
    <img src="img/icons/logo.svg" alt="логотип Тайпотеки" />
  </a>
);
