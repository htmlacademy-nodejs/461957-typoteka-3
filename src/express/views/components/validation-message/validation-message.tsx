import React, {FunctionComponent} from "react";

import {FieldValidationBlock} from "../form/field-vlidation-block";
import {FormValidationMessage} from "../form/form-validation-message";

interface Props {
  message?: string;
}

const ValidationMessage: FunctionComponent<Props> = ({message}) => {
  return message ? (
    <FieldValidationBlock>
      <FormValidationMessage>{message}</FormValidationMessage>
    </FieldValidationBlock>
  ) : null;
};

export {ValidationMessage};
