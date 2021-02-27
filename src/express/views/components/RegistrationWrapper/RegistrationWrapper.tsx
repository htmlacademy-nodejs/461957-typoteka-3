import React, {FunctionComponent} from "react";
import {ClientRoutes} from "../../../../constants-es6";

interface Props {}

export const RegistrationWrapper: FunctionComponent<Props> = ({children}) => {
  return (
    <main>
      <h1 className="visually-hidden">Регистрация пользователя</h1>
      <section>
        <div className="popup popup--registration popup--anti">
          <a className="popup__button button button--popup-close" aria-label="Закрыть окно" href={ClientRoutes.INDEX}>
            Закрыть окно
          </a>
          {children}
        </div>
      </section>
    </main>
  );
};
