import React, {FunctionComponent} from "react";

import {CategoryEditable, CategoryEditableProps} from "../components/CategoryEditable/CategoryEditable";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {NewCategory} from "../components/NewCategory/NewCategory";
import {ICsrfInput} from "../interfaces/csrf-input";
import {ICurrentUser} from "../interfaces/current-user";

interface Props extends ICurrentUser, ICsrfInput {
  newCategoryEndPoint: string;
  categories: CategoryEditableProps[];
}

export const CategoriesPage: FunctionComponent<Props> = ({newCategoryEndPoint, categories, currentUser, csrf}) => {
  return (
    <LayoutFilled pageTitle={"Категории"} currentUser={currentUser}>
      <main className="main-page main-page--padding">
        <section className="main-page__category category">
          <h1 className="category__title">Категории</h1>
          <NewCategory endPoint={newCategoryEndPoint} csrf={csrf} />
          <ul className="category__list">
            {categories.map(category => (
              <CategoryEditable
                label={category.label}
                endPoint={category.endPoint}
                id={category.id}
                key={category.label}
                csrf={category.csrf}
              />
            ))}
          </ul>
        </section>
      </main>
    </LayoutFilled>
  );
};
