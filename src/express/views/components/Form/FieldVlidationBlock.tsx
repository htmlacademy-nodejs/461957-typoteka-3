import React, {FunctionComponent} from "react";

export const FieldValidationBlock: FunctionComponent = ({children}) => (
  <div className="form__validation-error">{children}</div>
);
