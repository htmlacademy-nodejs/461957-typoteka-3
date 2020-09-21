import React from "react";
import PropTypes from "prop-types";
import {Last} from "../Last/Last";

export function LastList(props) {
  const lastList = props.lastList.map(last => (
    <li className="last__list-item" key={last.title}>
      <Last title={last.title} link={last.link} authorAvatar={last.authorAvatar} authorName={last.authorName} />
    </li>
  ));

  return (
    <section className="main-page__last last">
      <h2 className="last__name">
        Последние комментарии <span className="last__icon last__icon--cloud"></span>
      </h2>
      <ul className="last__list">{lastList}</ul>
    </section>
  );
}

LastList.propTypes = {
  lastList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      authorName: PropTypes.string.isRequired,
      authorAvatar: PropTypes.string.isRequired,
    }),
  ),
};
