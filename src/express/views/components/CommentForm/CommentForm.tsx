import React, {FunctionComponent} from "react";
import {COMMENT_FORM_FIELDS} from "../../../../constants-es6";
import {CsrfHiddenInput} from "../CsrfHiddenInput/CsrfHiddenInput";
import {ICsrfInput} from "../../interfaces/csrf-input";
import {Avatar} from "../Avatar/Avatar";

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
    <button type="submit" className="comments__button button button--colored">
      Опубликовать
    </button>
    <CsrfHiddenInput csrf={csrf} />
  </form>
);
