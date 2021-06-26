import React, {FunctionComponent} from "react";

import {FieldValidationBlock} from "../Form/FieldVlidationBlock";
import {FormValidationMessage} from "../Form/FormValidationMessage";

interface Props {
  message?: string;
}

export const ValidationMessage: FunctionComponent<Props> = ({message}) => {
  return message ? (
    <FieldValidationBlock>
      <FormValidationMessage>{message}</FormValidationMessage>
    </FieldValidationBlock>
  ) : null;
};
