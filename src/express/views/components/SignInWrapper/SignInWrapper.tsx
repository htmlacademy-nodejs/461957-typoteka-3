import React, {FunctionComponent} from "react";
import {ClientRoutes} from "../../../../constants-es6";

interface Props {}

export const SignInWrapper: FunctionComponent<Props> = ({children}) => {
  return (
    <main>
      <h1 className="visually-hidden">Войти</h1>
      <section>
        <div className="popup popup--registration popup--anti ms-depth-4">
          <a className="popup__button button button--popup-close" aria-label="Закрыть окно" href={ClientRoutes.INDEX}>
            Закрыть окно
          </a>
          {children}
        </div>
      </section>
    </main>
  );
};
