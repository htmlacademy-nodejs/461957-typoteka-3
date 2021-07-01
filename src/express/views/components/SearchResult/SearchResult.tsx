import React, {FunctionComponent} from "react";

import {HighlightedQuery} from "../HiglightedQuery/HighlightedQuery";

interface SearchResultProps {
  date: Date;
  text: string;
  match: string;
  link: string;
}

const SearchResult: FunctionComponent<SearchResultProps> = ({date, match, text, link}) => {
  return (
    <div className="search__result">
      <time className="search__date" dateTime={date.toISOString()}>
        {date.toLocaleString()}
      </time>
      <a className="search__link" href={link}>
        <HighlightedQuery text={text} match={match} />
      </a>
    </div>
  );
};

export {
  SearchResult,
  SearchResultProps,
};
