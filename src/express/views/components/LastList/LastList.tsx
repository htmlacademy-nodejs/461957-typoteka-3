import React, {FunctionComponent} from "react";

import {Last, LastProps} from "../Last/Last";

interface LastListProps {
  listOfLast: LastProps[];
}

const LastList: FunctionComponent<LastListProps> = ({listOfLast}) => {
  const lastList = listOfLast.map(last => (
    <li className="last__list-item" key={last.title}>
      <Last title={last.title} link={last.link} authorAvatar={last.authorAvatar} authorName={last.authorName} />
    </li>
  ));

  return (
    <section className="main-page__last last">
      <h2 className="last__name">
        Последние комментарии <span className="last__icon last__icon--cloud" />
      </h2>
      <ul className="last__list">{lastList}</ul>
    </section>
  );
};

export {
  LastList,
};
