import {ClientRoutes} from "../../../../../../constants-es6";
import React, {FunctionComponent} from "react";

export const SearchButton: FunctionComponent = () => (
  <a className="header__search button button--search" href={ClientRoutes.SEARCH.INDEX} aria-label="поиск по сайту" />
);
