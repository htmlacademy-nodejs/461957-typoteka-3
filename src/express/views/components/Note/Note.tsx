import React from "react";

interface Props {
  createdDate: Date;
  title: string;
  link: string;
}

export function Note(props: Props): JSX.Element {
  return (
    <>
      <time className="notes__item-time" dateTime={props.createdDate.toISOString()}>
        {props.createdDate.toLocaleString()}
      </time>
      <a className="notes__item-text" href={props.link}>
        {props.title}
      </a>
      <button className="notes__button button button--close-item" type="button">
        <span className="visually-hidden">Закрыть строку списка</span>
      </button>
    </>
  );
}
