import React, {FunctionComponent} from "react";
import {Category} from "../../../../types/category";

export interface CategoriesSelectProps {
  inputName: string;
  availableCategories: Category[];
  selectedCategories: Category[];
}

export const CategoriesSelect: FunctionComponent<CategoriesSelectProps> = ({
  inputName,
  availableCategories,
  selectedCategories,
}) => (
  // TODO: Select selected categories
  <div style={{display: `flex`, flexWrap: `wrap`}}>
    {availableCategories.map(category => (
      <div className="new-publication__checkbox" key={category.id} style={{display: `flex`}}>
        <input type="checkbox" name={inputName + `[` + category.id + `]`} id={`checkbox` + category.id} />
        <label htmlFor={`checkbox` + category.id} style={{marginTop: `12px`}}>
          {category.label}
        </label>
      </div>
    ))}
    <a
      key={`link-to-new-category`}
      className="new-publication__form-link button button--transparent"
      style={{marginTop: `12px`, marginBottom: 0, padding: `8px 20px`, marginLeft: `auto`}}
      href="#"
    >
      Добавить категорию
    </a>
  </div>
);
