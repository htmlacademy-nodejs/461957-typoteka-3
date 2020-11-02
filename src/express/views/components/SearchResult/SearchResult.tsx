import React, {FunctionComponent} from "react";

export interface SearchResultProps {
  date: Date;
  text: string;
  match: string;
}

export const SearchResult: FunctionComponent<SearchResultProps> = ({date, match, text}) => {
  return (
    <div className="search__result">
      <time className="search__date" dateTime={date.toISOString()}>
        {date.toLocaleString()}
      </time>
      <a className="search__link">{highlightQuery(text, match)}</a>
    </div>
  );

  function highlightQuery(label: string, value: string) {
    if (!value) {
      return label;
    }
    return (
      <span>
        {label.split(value).reduce((prev, current, i) => {
          if (!i) {
            return [current];
          }
          return prev.concat(<mark><b key={value + current}>{value}</b></mark>, current);
        }, [])}
      </span>
    );
  }
};
