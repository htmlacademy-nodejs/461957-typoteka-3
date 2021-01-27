import React, {FunctionComponent} from "react";
import type {Category, ICategoryId} from "../../../../types/category";

export interface CategoriesSelectProps {
  inputName: string;
  availableCategories: Category[];
  selectedCategories: ICategoryId[];
}

export const CategoriesSelect: FunctionComponent<CategoriesSelectProps> = ({
  inputName,
  availableCategories,
  selectedCategories,
}) => (
  // TODO: Select selected categories
  <div className="new-publication__category-wrapper">
    {availableCategories.map(category => (
      <div className="new-publication__checkbox" key={category.id} style={{display: `flex`}}>
        <input type="checkbox" name={inputName + `[` + category.id + `]`} id={`checkbox` + `[` + category.id + `]`} />
        <label htmlFor={`checkbox` + `[` + category.id + `]`}>{category.label}</label>
      </div>
    ))}
    <a
      key={`link-to-new-category`}
      className="new-publication__form-link button button--transparent"
      style={{marginBottom: 0, padding: `8px 20px`, marginLeft: `auto`}}
      href="#">
      Добавить категорию
    </a>
  </div>
);
