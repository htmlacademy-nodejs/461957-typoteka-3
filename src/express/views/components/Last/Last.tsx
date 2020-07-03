import React from "react";
import PropTypes from "prop-types";

export function Last(props) {
  return (
    <>
      <img className="last__list-image" src={props.authorAvatar} width="20" height="20" alt="Аватар пользователя" />
      <b className="last__list-name">{props.authorName}</b>
      <a className="last__list-link" href={props.link}>
        {props.title}
      </a>
    </>
  );
}

Last.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
};
