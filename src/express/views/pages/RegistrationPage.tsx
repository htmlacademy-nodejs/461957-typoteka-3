import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {Registration} from "../components/Registration/Registration";

interface Props {
  endPoint: string;
}

export const RegistrationPage: FunctionComponent<Props> = ({endPoint}) => {
  return (
    <LayoutFilled>
      <main>
        <h1 className="visually-hidden">Регистрация пользователя</h1>
        <section>
          <Registration endPoint={endPoint} />
        </section>
      </main>
    </LayoutFilled>
  );
};
