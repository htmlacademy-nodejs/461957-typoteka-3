import React, {FunctionComponent} from "react";

interface Props {
  createdDate: Date;
  title: string;
  link: string;
}

const Note: FunctionComponent<Props> = ({title, createdDate, link}) => {
  return (
    <>
      <time className="notes__item-time" dateTime={createdDate.toISOString()}>
        {createdDate.toLocaleString()}
      </time>
      <a className="notes__item-text" href={link}>
        {title}
      </a>
      <button className="notes__button button button--close-item" type="button">
        <span className="visually-hidden">Закрыть строку списка</span>
      </button>
    </>
  );
};

export {
  Note,
};
