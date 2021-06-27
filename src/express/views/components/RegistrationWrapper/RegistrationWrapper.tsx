import {Stack} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {DialogHeader} from "../Dialog/DialogHeader/DialogHeader";

export const RegistrationWrapper: FunctionComponent = ({children}) => {
  return (
    <main>
      <h1 className="visually-hidden">Регистрация пользователя</h1>
      <section>
        <div className="popup popup--registration popup--anti ms-depth-4">
          <div className="popup__form popup__form--active form form--register">
            <Stack tokens={{childrenGap: 32}}>
              <DialogHeader title="Войти" />
              {children}
            </Stack>
          </div>
        </div>
      </section>
    </main>
  );
};
