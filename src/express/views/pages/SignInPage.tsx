import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {SignInWrapper} from "../components/SignInWrapper/SignInWrapper";

interface Props {
  endPoint: string;
}

export const SignInPage: FunctionComponent<Props> = ({endPoint}) => {
  return (
    <LayoutFilled pageTitle={`Вход`}>
      <SignInWrapper>
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
      </SignInWrapper>
    </LayoutFilled>
  );
};
