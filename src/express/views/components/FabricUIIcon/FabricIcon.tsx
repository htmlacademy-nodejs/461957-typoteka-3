import React, {FunctionComponent} from "react";

interface Props {
  icon: string;
  size?: string;
}

export const FabricUIIcon: FunctionComponent<Props> = ({icon, size}) => (
  <i className={"ms-Icon ms-Icon--" + icon + " ms-fontSize-" + size} aria-hidden="true" />
);
