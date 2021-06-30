import {Text} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {CloseButton} from "../CloseButton/CloseButton";

interface Props {
  title: string;
}

const DialogHeader: FunctionComponent<Props> = ({title}) => (
  <div className="dialog-header">
    <Text variant="xxLarge" block>
      {title}
    </Text>
    <div className="dialog-header__close-button">
      <CloseButton />
    </div>
  </div>
);

export {
  DialogHeader,
};
