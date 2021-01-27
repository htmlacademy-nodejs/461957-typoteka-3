import React, {FunctionComponent} from "react";
import {Comment} from "../Comment/Comment";

interface Props {
  parentCssClass: string;
}

export const CommentsList: FunctionComponent<Props> = ({parentCssClass}) => {
  const comments: [string, number][] = [
    [
      `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      1,
    ],
    [
      `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      2,
    ],
    [
      `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      3,
    ],
    [
      `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      4,
    ],
    [
      `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      5,
    ],
    [
      `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      6,
    ],
  ];
  return (
    <section className={`${parentCssClass}__comments comments`}>
      <h2 className="comments__title title title--middle">Комментарии</h2>
      <ul className="comments__list">
        {comments.map(item => (
          <Comment text={item[0]} key={item[1]} />
        ))}
      </ul>
      <div className="comments__footer comments__footer--user"></div>
    </section>
  );
};
