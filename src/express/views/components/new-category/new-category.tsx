import React, {FunctionComponent} from "react";

import {ICsrfInput} from "../../interfaces/csrf-input";
import {CsrfHiddenInput} from "../csrf-hidden-input/csrf-hidden-input";

interface Props extends ICsrfInput {
  endPoint: string;
}

const NewCategory: FunctionComponent<Props> = ({endPoint, csrf}) => {
  return (
    <div className="category__add-form">
      <form action={endPoint} method="POST">
        <input type="text" name="add-category" id="add-form-add-category" placeholder="Новая категория" />
        <label htmlFor="add-form-add-category">
          <span className="visually-hidden">Добавить категорию</span>
        </label>
        <button className="category__button button button--category" type="submit">
          Добавить
        </button>
        <CsrfHiddenInput csrf={csrf} />
      </form>
    </div>
  );
};

export {NewCategory};
