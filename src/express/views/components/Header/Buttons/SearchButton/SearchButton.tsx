import React, {FunctionComponent} from "react";

import {ClientRoutes} from "../../../../../../constants-es6";

export const SearchButton: FunctionComponent = () => (
  <a className="header__search button button--search" href={ClientRoutes.SEARCH.INDEX} aria-label="поиск по сайту" />
);
