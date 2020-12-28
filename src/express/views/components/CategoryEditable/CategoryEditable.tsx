import React, {FunctionComponent} from "react";
import {CategoryId} from "../../../../types/category-id";

export interface CategoryEditableProps {
  label: string;
  id: CategoryId;
  endPoint: string;
}

export const CategoryEditable: FunctionComponent<CategoryEditableProps> = ({label, endPoint, id}) => {
  return (
    <li className="category__list-item">
      <form action={endPoint} method="PATCH">
        <input type="text" name={"category-" + id} id={"modify-form-category-" + id} defaultValue={label} />
        <label htmlFor={"modify-form-category-" + id}>
          <span className="visually-hidden">Редактировать категорию</span>
        </label>
        <button className="category__button button button--category" type="submit">
          Сохранить
        </button>
        <button className="category__button button button--category" type="button">
          Удалить
        </button>
      </form>
    </li>
  );
};
