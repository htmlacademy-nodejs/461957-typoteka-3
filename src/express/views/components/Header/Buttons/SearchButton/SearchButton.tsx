import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../../../constants-es6";

export const SearchButton: FunctionComponent = () => (
  <a className="header__search button button--search" href={ClientRoute.SEARCH.INDEX} aria-label="поиск по сайту" />
);
