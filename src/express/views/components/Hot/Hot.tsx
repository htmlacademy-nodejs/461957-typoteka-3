import React from "react";
import PropTypes from "prop-types";

export function Hot(props) {
  return (
    <a className="hot__list-link" href={props.link}>
      {props.title}
      <sup className="hot__link-sup">{props.count}</sup>
    </a>
  );
}

Hot.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
