import {IconButton} from "@fluentui/react";
import {IIconProps} from "@fluentui/react/lib/components/Icon";
import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../../shared/constants/routes/client-route";

const closeButton: IIconProps = {iconName: "ChromeClose"};

const CloseButton: FunctionComponent = () => (
  <IconButton href={ClientRoute.INDEX} iconProps={closeButton} title="Закрыть окно" ariaLabel="Закрыть окно" />
);

export {
  CloseButton,
};
