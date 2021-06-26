import React, {FunctionComponent} from "react";

import {getPagesCount} from "../../../helpers/page-resolver";

import {Pagination} from "./Pagination";

interface Props extends IPaginationProps {
  prefix: string;
}

export interface IPaginationProps {
  page: number;
  total: number;
}

const WIDTH = 2;

export const PaginationController: FunctionComponent<Props> = ({total, page, prefix}) => {
  const totalPages = getPagesCount(total);
  let start = page - WIDTH;
  let end = page + WIDTH;

  // передвинем диапазон вправо, если он начинается с номера меньше единицы
  if (start < 1) {
    end += 1 - start;
    start = 1;
  }
  // передвинем диапазон влево, если он заканчивается номером больше количества страниц
  if (end > totalPages) {
    start -= end - totalPages;
    end = totalPages;
  }

  // если мы оказались в этой ветке, значит, всего страниц слишком мало. делаем начало диапазона 1
  if (start < 1) {
    start = 1;
  }
  return (
    <Pagination
      hasPrev={start > 1}
      hasNext={end < totalPages}
      current={page}
      min={start}
      max={end}
      last={totalPages}
      prefix={prefix}
    />
  );
};
