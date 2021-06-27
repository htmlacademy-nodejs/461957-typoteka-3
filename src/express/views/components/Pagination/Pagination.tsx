import React, {FunctionComponent} from "react";

import {PAGE_QUERY_PARAM} from "../../../../constants";

interface PaginationProps {
  hasPrev: boolean;
  hasNext: boolean;
  current: number;
  min: number;
  max: number;
  last: number;
  prefix: string;
}

export const Pagination: FunctionComponent<PaginationProps> = ({hasPrev, hasNext, min, max, current, prefix, last}) => {
  return (
    <ul className={"pagination preview__pagination"} style={{justifyContent: `center`}}>
      {hasPrev && (
        <li>
          <a
            className="pagination__button button button--backwards"
            href={getLink(1, prefix)}
            aria-label="Первая страница">
            Первая страница
          </a>
        </li>
      )}
      {getNumbers(min, max, current, prefix)}
      {hasNext && (
        <li>
          <a
            className="pagination__button button button--forward"
            href={getLink(last, prefix)}
            aria-label="Последняя страница">
            Последняя страница
          </a>
        </li>
      )}
    </ul>
  );
};

function getNumbers(min: number, max: number, current: number, prefix: string): JSX.Element[] {
  const length = new Array(max + 1 - min).fill(undefined);
  return length.map((item, index) => {
    const currentValue = min + index;
    return (
      <li
        className={"pagination__item " + (currentValue === current ? "pagination__item--active" : "")}
        style={{pointerEvents: currentValue === current ? `none` : `auto`}}
        key={currentValue}>
        <a href={getLink(currentValue, prefix)}>{currentValue}</a>
      </li>
    );
  });
}

function getLink(pageNumber: number, prefix: string): string {
  return `${prefix}${PAGE_QUERY_PARAM}=${pageNumber}`;
}
