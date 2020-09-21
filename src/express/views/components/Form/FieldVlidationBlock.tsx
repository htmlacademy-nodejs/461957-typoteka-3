import React, {FunctionComponent} from "react";

export const FieldValidationBlock: FunctionComponent = ({children}) => (
  <div
    className="form__validation-error"
    style={{
      marginTop: `4px`,
      marginBottom: `14px`,
      padding: `4px 20px 10px`,
      lineHeight: 1,
      marginRight: `auto`,
      width: `max-content`,
    }}
  >
    <ul className="form__errors">{children}</ul>
  </div>
);
