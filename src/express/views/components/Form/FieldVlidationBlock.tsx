import React, {FunctionComponent} from "react";

const FieldValidationBlock: FunctionComponent = ({children}) => (
  <div className="form__validation-error">{children}</div>
);

export {
  FieldValidationBlock,
};
