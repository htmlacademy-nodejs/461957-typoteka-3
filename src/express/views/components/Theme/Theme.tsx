import React from "react";
import PropTypes from "prop-types";

export function Theme(props) {
  return (
    <>
      <a className="themes__item-link" href={props.link}>
        {props.title}
        <sup>{props.count}</sup>
      </a>
      <button className="themes__remove-btn" type="button">
        Удалить категорию
      </button>
    </>
  );
}

Theme.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
