import React, {FunctionComponent} from "react";
import {CSRF_INPUT_NAME} from "../../../../shared/constants/forms/csrf-input-name";

import {ICsrfInput} from "../../interfaces/csrf-input";

export const CsrfHiddenInput: FunctionComponent<ICsrfInput> = ({csrf}) => (
  <input type="hidden" value={csrf} name={CSRF_INPUT_NAME} />
);
