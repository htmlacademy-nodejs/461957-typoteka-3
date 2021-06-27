import {IconButton} from "@fluentui/react";
import {IIconProps} from "@fluentui/react/lib/components/Icon";
import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../../constants-es6";

const closeButton: IIconProps = {iconName: "ChromeClose"};

export const CloseButton: FunctionComponent = () => (
  <IconButton href={ClientRoute.INDEX} iconProps={closeButton} title="Закрыть окно" ariaLabel="Закрыть окно" />
);
