import React, {FunctionComponent} from "react";
import {CategoryId} from "../../../../types/category-id";
import {CsrfHiddenInput} from "../CsrfHiddenInput/CsrfHiddenInput";
import {ICsrfInput} from "../../interfaces/csrf-input";

export interface CategoryEditableProps extends ICsrfInput {
  label: string;
  id: CategoryId;
  endPoint: string;
}

export const CategoryEditable: FunctionComponent<CategoryEditableProps> = ({label, endPoint, id, csrf}) => {
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
        <CsrfHiddenInput csrf={csrf} />
      </form>
    </li>
  );
};
