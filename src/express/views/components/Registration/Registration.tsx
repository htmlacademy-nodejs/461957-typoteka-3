import React, {FunctionComponent} from "react";
import {ClientRoutes} from "../../../../constants-es6";

interface Props {
  endPoint: string;
}

export const Registration: FunctionComponent<Props> = ({endPoint}) => {
  return (
    <div className="popup popup--registration popup--anti">
      <a className="popup__button button button--popup-close" aria-label="Закрыть окно" href={ClientRoutes.INDEX}>
        Закрыть окно
      </a>
      <h2 className="popup__title">Регистрация</h2>
      <div className="popup__form popup__form--active form form--register">
        <form action={endPoint} method="POST" encType="multipart/form-data">
          <div className="form__field">
            <label>
              <input type="email" name="email" placeholder="Электронная почта" required />
            </label>
          </div>
          <div className="form__field">
            <label>
              <input type="text" name="name" placeholder="Имя" required />
            </label>
          </div>
          <div className="form__field">
            <label>
              <input type="text" name="surname" placeholder="Фамилия" />
            </label>
          </div>
          <div className="form__field">
            <label>
              <input type="password" name="password" placeholder="Пароль" required />
            </label>
          </div>
          <div className="form__field">
            <label>
              <input type="password" name="repeat-password" placeholder="Повтор пароля" required />
            </label>
          </div>
          <div className="form__validation-error">
            <p className="form__error-message">При регистрации произошли ошибки:</p>
            <ul className="form__errors">
              <li className="form__error">Пароль не может состоять из двух букв</li>
              <li className="form__error">Фамилия не должна быть смешной</li>
            </ul>
          </div>
          <div className="form__image-loader">
            <a className="form__avatar avatar">
              <img src="img/icons/smile.svg" alt="аватар пользователя" />
            </a>
            <label>
              <input type="file" name="upload" className="visually-hidden" />
              Загрузить фото профиля
            </label>
          </div>
          <button className="form__submit-btn form__submit-btn--register button button--colored" type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};
