import React from "react";

export const FabricUIIcon = ({icon, size}: {icon: string; size?: string}) => (
  <i className={"ms-Icon ms-Icon--" + icon + " ms-fontSize-" + size} aria-hidden="true" />
);
