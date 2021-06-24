import React, {FunctionComponent} from "react";
import {DialogHeader} from "../Dialog/DialogHeader/DialogHeader";
import {Stack} from "@fluentui/react";

export const SignInWrapper: FunctionComponent = ({children}) => {
  return (
    <main>
      <h1 className="visually-hidden">Войти</h1>
      <section>
        <div className="popup popup--registration popup--anti ms-depth-4">
          <div className="popup__form form form--log-in">
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
