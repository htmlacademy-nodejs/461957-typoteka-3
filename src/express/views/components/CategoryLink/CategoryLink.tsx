import React, {FunctionComponent} from "react";

interface CategoryLinkProps {
  title: string;
  link: string;
  count: number;
}

export const CategoryLink: FunctionComponent<CategoryLinkProps> = ({title, link, count}) => {
  return (
    <>
      <a className="themes__item-link" href={link}>
        {title}
        <sup>{count}</sup>
      </a>
      <button className="themes__remove-btn" type="button">
        Удалить категорию
      </button>
    </>
  );
};
