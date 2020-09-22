import React, {FunctionComponent} from "react";

export interface LastProps {
  title: string;
  link: string;
  authorName: string;
  authorAvatar: string;
}

export const Last: FunctionComponent<LastProps> = ({title, link, authorName, authorAvatar}) => {
  return (
    <>
      <img className="last__list-image" src={authorAvatar} width="20" height="20" alt="Аватар пользователя" />
      <b className="last__list-name">{authorName}</b>
      <a className="last__list-link" href={link}>
        {title}
      </a>
    </>
  );
};
