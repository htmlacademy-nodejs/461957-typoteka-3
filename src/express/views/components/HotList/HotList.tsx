import React from "react";
import PropTypes from "prop-types";
import {Hot} from "../Hot/Hot";

export function HotList(props) {
  const hotList = props.hotList.map(hot => (
    <li className="hot__list-item" key={hot.title}>
      <Hot title={hot.title} link={hot.link} count={hot.count} />
    </li>
  ));

  return (
    <section className="main-page__hot hot">
      <h2 className="hot__name">
        Самое обсуждаемое <span className="hot__icon hot__icon--fire"></span>
      </h2>
      <ul className="hot__list">{hotList}</ul>
    </section>
  );
}

HotList.propTypes = {
  hotList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ),
};
