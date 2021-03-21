import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {NewCategory} from "../components/NewCategory/NewCategory";
import {CategoryEditable, CategoryEditableProps} from "../components/CategoryEditable/CategoryEditable";
import {ICurrentUser} from "../interfaces/current-user";

interface Props extends ICurrentUser {
  newCategoryEndPoint: string;
  categories: CategoryEditableProps[];
}

export const CategoriesPage: FunctionComponent<Props> = ({newCategoryEndPoint, categories, currentUser}) => {
  return (
    <LayoutFilled pageTitle={"Категории"} currentUser={currentUser}>
      <main className="main-page main-page--padding">
        <section className="main-page__category category">
          <h1 className="category__title">Категории</h1>
          <NewCategory endPoint={newCategoryEndPoint} />
          <ul className="category__list">
            {categories.map(category => (
              <CategoryEditable
                label={category.label}
                endPoint={category.endPoint}
                id={category.id}
                key={category.label}
              />
            ))}
          </ul>
        </section>
      </main>
    </LayoutFilled>
  );
};
