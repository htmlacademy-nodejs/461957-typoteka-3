import React, {FunctionComponent} from "react";
import {CategoryLink} from "../CategoryLink/CategoryLink";

interface CategoriesListProps {
  categories: {
    title: string;
    link: string;
    count: number;
  }[];
}

export const CategoriesList: FunctionComponent<CategoriesListProps> = ({categories}) => (
  <section className="main-page__theme-list">
    <h2 className="visually-hidden">Список тем</h2>
    <ul className="themes">
      {categories.map(theme => (
        <li className="themes__item" key={theme.link}>
          <CategoryLink title={theme.title} count={theme.count} link={theme.link} />
        </li>
      ))}
    </ul>
  </section>
);
