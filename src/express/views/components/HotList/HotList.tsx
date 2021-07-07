import React, {FunctionComponent} from "react";

import {Hot, HotProps} from "../Hot/Hot";

interface HotListProps {
  listOfHot: HotProps[];
}

const HotList: FunctionComponent<HotListProps> = ({listOfHot}) => {
  const hotList = listOfHot.map(hot => (
    <li className="hot__list-item" key={hot.announce}>
      <Hot announce={hot.announce} link={hot.link} count={hot.count} />
    </li>
  ));

  return (
    <section className="main-page__hot hot">
      <h2 className="hot__name">
        Самое обсуждаемое <span className="hot__icon hot__icon--fire" />
      </h2>
      <ul className="hot__list">{hotList}</ul>
    </section>
  );
};

export {HotList};
