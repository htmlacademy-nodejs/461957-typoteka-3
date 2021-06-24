import {ClientRoutes} from "../../../../../constants-es6";
import {IconButton} from "@fluentui/react";
import React, {FunctionComponent} from "react";
import {IIconProps} from "@fluentui/react/lib/components/Icon";

const closeButton: IIconProps = {iconName: "ChromeClose"};

export const CloseButton: FunctionComponent = () => (
  <IconButton href={ClientRoutes.INDEX} iconProps={closeButton} title="Закрыть окно" ariaLabel="Закрыть окно" />
);
