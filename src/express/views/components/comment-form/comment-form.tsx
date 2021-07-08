import {PrimaryButton} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {CommentFormField} from "../../../../shared/constants/forms/comment-form-field";
import {ICsrfInput} from "../../interfaces/csrf-input";
import {Avatar} from "../avatar/avatar";
import {CsrfHiddenInput} from "../csrf-hidden-input/csrf-hidden-input";

interface Props extends ICsrfInput {
  endPoint: string;
  avatar: string;
  text?: string;
}

const CommentForm: FunctionComponent<Props> = ({endPoint, csrf, avatar, text}) => (
  <form action={endPoint} method="POST" encType="multipart/form-data" className="comment-form">
    <Avatar avatar={avatar} cssClass="comments__avatar" />
    <label>
      <textarea
        rows={1}
        name={CommentFormField.TEXT.name}
        defaultValue={text}
        placeholder="Присоединиться к обсуждению"
        required
      />
    </label>
    <PrimaryButton className="comments__button" type="submit">
      Опубликовать
    </PrimaryButton>
    <CsrfHiddenInput csrf={csrf} />
  </form>
);

export {CommentForm};
