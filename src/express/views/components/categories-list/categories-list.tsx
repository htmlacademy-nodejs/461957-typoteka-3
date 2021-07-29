import React, {FunctionComponent} from "react";

import {CategoryId} from "../../../../types/category-id";
import {CategoryWithLinksAndNumbers} from "../../../../types/category-with-links-and-numbers";
import {CategoryLink} from "../category-link/category-link";

interface Props {
  categories: CategoryWithLinksAndNumbers[];
  selectedCategoryId?: CategoryId;
}

const CategoriesList: FunctionComponent<Props> = ({categories, selectedCategoryId}) => (
  <>
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
  </>
);

export {CategoriesList};
