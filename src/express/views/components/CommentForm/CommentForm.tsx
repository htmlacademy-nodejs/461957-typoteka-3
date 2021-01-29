import React, {FunctionComponent} from "react";

interface Props {
  endPoint: string;
}

export const CommentForm: FunctionComponent<Props> = ({endPoint}) => (
  <form action={endPoint} method="POST">
    <div className="comments__avatar avatar">
      <img src="https://via.placeholder.com/50x50.webp" alt="аватар пользователя" />
    </div>
    <label>
      <textarea rows={1} name="message" placeholder="Присоединиться к обсуждению" />
    </label>
    <button type="submit" className="comments__button button button--colored">
      Опубликовать
    </button>
  </form>
);
