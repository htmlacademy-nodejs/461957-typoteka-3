import React, {FunctionComponent} from "react";
import {CategoryWithLinksAndNumbers} from "../../../../types/category-with-links-and-numbers";

export const CategoryLink: FunctionComponent<CategoryWithLinksAndNumbers> = ({label, link, count}) => {
  return (
    <>
      <a className="themes__item-link" href={link}>
        {label}
        <sup>{count}</sup>
      </a>
      <button className="themes__remove-btn" type="button">
        Удалить категорию
      </button>
    </>
  );
};
