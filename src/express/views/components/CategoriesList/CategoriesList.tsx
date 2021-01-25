import React, {FunctionComponent} from "react";
import {CategoryLink} from "../CategoryLink/CategoryLink";
import {CategoryWithLinksAndNumbers} from "../../../../types/category-with-links-and-numbers";
import {CategoryId} from "../../../../types/category-id";

interface Props {
  categories: CategoryWithLinksAndNumbers[];
  selectedCategoryId?: CategoryId;
}

export const CategoriesList: FunctionComponent<Props> = ({categories, selectedCategoryId}) => (
  <>
    <h2 className="visually-hidden">Список тем</h2>
    <ul className="themes">
      {categories
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(theme => (
          <li className="themes__item" key={theme.link}>
            <CategoryLink
              id={theme.id}
              label={theme.label}
              count={theme.count}
              link={theme.link}
              isActive={theme.id === selectedCategoryId}
            />
          </li>
        ))}
    </ul>
  </>
);
