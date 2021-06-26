import {PrimaryButton} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {COMMENT_FORM_FIELDS} from "../../../../constants-es6";
import {ICsrfInput} from "../../interfaces/csrf-input";
import {Avatar} from "../Avatar/Avatar";
import {CsrfHiddenInput} from "../CsrfHiddenInput/CsrfHiddenInput";

interface Props extends ICsrfInput {
  endPoint: string;
  avatar: string;
}

export const CommentForm: FunctionComponent<Props> = ({endPoint, csrf, avatar}) => (
  <form action={endPoint} method="POST" encType="multipart/form-data">
    <Avatar avatar={avatar} cssClass="comments__avatar" />
    <label>
      <textarea rows={1} name={COMMENT_FORM_FIELDS.text.name} placeholder="Присоединиться к обсуждению" />
    </label>
    <PrimaryButton className="comments__button" type="submit">
      Опубликовать
    </PrimaryButton>
    <CsrfHiddenInput csrf={csrf} />
  </form>
);
