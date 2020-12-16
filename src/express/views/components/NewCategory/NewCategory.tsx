import React, {FunctionComponent} from "react";

interface Props {
  endPoint: string;
}

export const NewCategory: FunctionComponent<Props> = ({endPoint}) => {
  return (
    <div className="category__add-form">
      <form action={endPoint} method="POST" >
        <input type="text" name="add-category" id="add-form-add-category" placeholder="Новая категория" />
        <label htmlFor="add-form-add-category">
          <span className="visually-hidden">Добавить категорию</span>
        </label>
        <button className="category__button button button--category" type="submit">
          Добавить
        </button>
      </form>
    </div>
  );
};
