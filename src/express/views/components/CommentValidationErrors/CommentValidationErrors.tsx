import React, {FunctionComponent} from "react";
import {FormValidationBlock} from "../Form/FormValidationBlock";
import {FormValidationMessage} from "../Form/FormValidationMessage";
import {COMMENT_FORM_FIELDS} from "../../../../constants-es6";
import {CommentValidationResponse} from "../../../../types/comment-validation-response";

interface Props {
  validationResponse: CommentValidationResponse;
}

export const CommentValidationErrors: FunctionComponent<Props> = ({validationResponse}) => (
  <FormValidationBlock title={"При сохранении комментария произошли ошибки:"}>
    {Object.entries(validationResponse).map(([key, validation]) => (
      <li key={key}>
        <FormValidationMessage>
          <strong>{COMMENT_FORM_FIELDS[key]?.label}:</strong> {validation}
        </FormValidationMessage>
      </li>
    ))}
  </FormValidationBlock>
);
