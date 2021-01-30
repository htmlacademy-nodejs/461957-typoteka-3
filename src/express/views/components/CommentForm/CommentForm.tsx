import React, {FunctionComponent} from "react";
import {COMMENT_FORM_FIELDS} from "../../../../constants-es6";

interface Props {
  endPoint: string;
}

export const CommentForm: FunctionComponent<Props> = ({endPoint}) => (
  <form action={endPoint} method="POST" encType="multipart/form-data">
    <div className="comments__avatar avatar">
      <img src="https://via.placeholder.com/50x50.webp" alt="аватар пользователя" />
    </div>
    <label>
      <textarea rows={1} name={COMMENT_FORM_FIELDS.text.name} placeholder="Присоединиться к обсуждению" />
    </label>
    <button type="submit" className="comments__button button button--colored">
      Опубликовать
    </button>
  </form>
);
