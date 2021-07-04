import React, {FunctionComponent} from "react";

import {Avatar} from "../Avatar/Avatar";

interface LastProps {
  title: string;
  link: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const Last: FunctionComponent<LastProps> = ({title, link, firstName, avatar, lastName}) => {
  return (
    <div className="last-comment">
      <div className="last-comment__header">
        <Avatar avatar={avatar} size="small" cssClass="comments__avatar" />
        <b className="last-comment__author-name">
          {firstName} {lastName}
        </b>
      </div>
      <a className="last-comment__text" href={link}>
        {title}
      </a>
    </div>
  );
};

export {Last, LastProps};
