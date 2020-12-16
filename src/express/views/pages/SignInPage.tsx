import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {SignIn} from "../components/SignIn/SignIn";

interface Props {
  endPoint: string;
}

export const SignInPage: FunctionComponent<Props> = ({endPoint}) => {
  return (
    <LayoutFilled>
      <main>
        <h1 className="visually-hidden">Войти</h1>
        <section>
          <SignIn endPoint={endPoint} />
        </section>
      </main>
    </LayoutFilled>
  );
};
