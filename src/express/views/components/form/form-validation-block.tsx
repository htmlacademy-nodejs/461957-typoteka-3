import React, {FunctionComponent} from "react";

import {FormValidationMessage} from "./form-validation-message";

interface FormValidationBlockProps {
  title?: string;
  messages: [string, string][];
}

const FormValidationBlock: FunctionComponent<FormValidationBlockProps> = ({title, messages}) => (
  <div className="form__validation-block">
    {title ? <p className="form__error-message">{title}</p> : null}
    <ul className="form__errors">
      {messages.map(([key, value]) => (
        <li key={key}>
          <FormValidationMessage>
            <strong>{key}:</strong> {value}
          </FormValidationMessage>
        </li>
      ))}
    </ul>
  </div>
);

export {FormValidationBlock, FormValidationBlockProps};
