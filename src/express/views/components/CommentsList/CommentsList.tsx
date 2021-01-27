import React, {FunctionComponent} from "react";
import {Comment} from "../Comment/Comment";

interface Props {
  parentCssClass: string;
}

export const CommentsList: FunctionComponent<Props> = ({parentCssClass}) => {
  const comments = [
    `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
    `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
    `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
    `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
    `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
    `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
  ];
  return (
    <section className={`${parentCssClass}__comments comments`}>
      <h2 className="comments__title title title--middle">Комментарии</h2>
      <ul className="comments__list">
        {comments.map(item => (
          <Comment text={item} />
        ))}
      </ul>
      <div className="comments__footer comments__footer--user"></div>
    </section>
  );
};
