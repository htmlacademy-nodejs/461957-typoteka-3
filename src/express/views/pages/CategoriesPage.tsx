import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {NewCategory} from "../components/NewCategory/NewCategory";

interface Props {
  newCategoryEndPoint: string;
}

export const CategoriesPage: FunctionComponent<Props> = ({newCategoryEndPoint}) => {
  return (
    <LayoutFilled>
      <main className="main-page main-page--padding">
        <section className="main-page__category category">
          <h1 className="category__title">Категории</h1>
          <NewCategory endPoint={newCategoryEndPoint} />
        </section>
      </main>
    </LayoutFilled>
  );
};
