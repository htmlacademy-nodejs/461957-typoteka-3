import React, {FunctionComponent} from "react";

import {CategoryId} from "../../../../types/category-id";
import {ICsrfInput} from "../../interfaces/csrf-input";
import {CsrfHiddenInput} from "../csrf-hidden-input/csrf-hidden-input";

interface CategoryEditableProps extends ICsrfInput {
  label: string;
  id: CategoryId;
  endPoint: string;
}

const CategoryEditable: FunctionComponent<CategoryEditableProps> = ({label, endPoint, id, csrf}) => {
  const idValue = id.toString(10);
  return (
    <li className="category__list-item">
      <form action={endPoint} method="PATCH">
        <input type="text" name={"category-" + idValue} id={"modify-form-category-" + idValue} defaultValue={label} />
        <label htmlFor={"modify-form-category-" + idValue}>
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

export {CategoryEditable, CategoryEditableProps};
