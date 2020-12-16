import React, {FunctionComponent} from "react";

interface PaginationProps {
  parentCssClass?: string;
  hasPrev: boolean;
  hasNext: boolean;
  current: number;
  min: number;
  max: number;
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  parentCssClass,
  hasPrev,
  hasNext,
  min,
  max,
  current,
}) => {
  return (
    <ul
      className={"pagination " + (parentCssClass ? `${parentCssClass}__pagination` : "")}
      style={{justifyContent: `center`}}>
      {hasPrev && (
        <li>
          <a
            className="pagination__button button button--backwards button--disabled"
            href="#"
            aria-label="Страница назад">
            Назад
          </a>
        </li>
      )}
      {getNumbers(min, max, current)}
      {hasNext && (
        <li>
          <a className="pagination__button button button--forward" href="#" aria-label="Страница вперед">
            Вперед
          </a>
        </li>
      )}
    </ul>
  );
};

function getNumbers(min: number, max: number, current: number): JSX.Element[] {
  const length = new Array(max + 1 - min).fill(undefined);
  return length.map((item, index) => {
    const currentValue = min + index;
    return (
      <li
        className={"pagination__item " + (currentValue === current ? "pagination__item--active" : "")}
        key={currentValue}>
        <a href="#">{currentValue}</a>
      </li>
    );
  });
}
