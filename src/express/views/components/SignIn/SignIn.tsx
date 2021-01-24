import React, {FunctionComponent} from "react";
import {ClientRoutes} from "../../../../constants-es6";

interface Props {
  endPoint: string;
}

export const SignIn: FunctionComponent<Props> = ({endPoint}) => {
  return (
    <div className="popup popup--registration popup--anti">
      <a className="popup__button button button--popup-close" aria-label="Закрыть окно" href={ClientRoutes.INDEX}>
        Закрыть окно
      </a>
      <h2 className="popup__title">Войти</h2>
      <div className="popup__form form form--log-in">
        <form action={endPoint} method="POST" encType="multipart/form-data">
          <div className="form__field">
            <label>
              <input type="email" name="email" placeholder="Электронная почта" required />
            </label>
          </div>
          <div className="form__field">
            <label>
              <input type="password" name="password" placeholder="Пароль" required />
            </label>
          </div>
          <p className="form__error-message">Некоторая ошибка произошла, беда!</p>
          <button className="form__submit-btn form__submit-btn--log-in button button--colored" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
