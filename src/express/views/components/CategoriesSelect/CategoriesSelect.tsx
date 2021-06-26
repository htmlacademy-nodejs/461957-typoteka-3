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
  <div className="new-publication__category-wrapper">
    {availableCategories.map(category => (
      <div className="new-publication__checkbox" key={category.id} style={{display: `flex`}}>
        <input
          type="checkbox"
          defaultChecked={selectedCategories.map(item => item.id).includes(category.id)}
          name={resolveCheckboxName(inputName, category.id)}
          id={resolveCheckboxId(category.id)}
        />
        <label htmlFor={resolveCheckboxId(category.id)}>{category.label}</label>
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

function resolveCheckboxName(inputName: string, categoryId: number): string {
  return `${inputName}[${categoryId.toString(10)}]`;
}

function resolveCheckboxId(categoryId: number): string {
  return `checkbox[${categoryId.toString(10)}]`;
}
