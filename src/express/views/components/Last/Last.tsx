import React, {FunctionComponent} from "react";

import {Avatar} from "../Avatar/Avatar";

interface LastProps {
  title: string;
  link: string;
  authorName: string;
  authorAvatar: string;
}

const Last: FunctionComponent<LastProps> = ({title, link, authorName, authorAvatar}) => {
  return (
    <div className="last-comment">
      <div className="last-comment__header">
        <Avatar avatar={authorAvatar} size="small" cssClass="comments__avatar" />
        <b className="last-comment__author-name">{authorName}</b>
      </div>
      <a className="last-comment__text" href={link}>
        {title}
      </a>
    </div>
  );
};

export {Last, LastProps};
