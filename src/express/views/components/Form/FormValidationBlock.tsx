import React, {FunctionComponent} from "react";

export interface FormValidationBlockProps {
  title?: string;
}

export const FormValidationBlock: FunctionComponent<FormValidationBlockProps> = ({title, children}) => (
  <div className="form__validation-error">
    {title ? <p className="form__error-message">{title}</p> : null}
    <ul className="form__errors">{children}</ul>
  </div>
);
