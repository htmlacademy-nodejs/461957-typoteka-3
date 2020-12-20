import React, {FunctionComponent} from "react";
import {CategoryWithLinksAndNumbers} from "../../../../types/category-with-links-and-numbers";

interface Props extends CategoryWithLinksAndNumbers {
  isActive?: boolean;
}

export const CategoryLink: FunctionComponent<Props> = ({label, link, count, isActive}) => {
  return (
    <>
      <a className={`themes__item-link ` + (isActive ? `themes__item-link--active` : ``)} href={link}>
        {label}
        <sup>{count}</sup>
      </a>
      <button className="themes__remove-btn" type="button">
        Удалить категорию
      </button>
    </>
  );
};
