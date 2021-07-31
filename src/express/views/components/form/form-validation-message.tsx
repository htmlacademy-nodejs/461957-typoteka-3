import React, {FunctionComponent} from "react";

const FormValidationMessage: FunctionComponent = ({children}) => <div className="form__error">{children}</div>;

export {
  FormValidationMessage,
};
