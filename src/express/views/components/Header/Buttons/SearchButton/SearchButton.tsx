import {ClientRoutes} from "../../../../../../constants-es6";
import React from "react";

export const SearchButton = () => (
  <a className="header__search button button--search" href={ClientRoutes.SEARCH.INDEX} aria-label="поиск по сайту" />
);
