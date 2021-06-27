import React, {FunctionComponent} from "react";

import {Footer} from "../components/Footer/Footer";
import {Header404} from "../components/Header/Header404";
import {Layout} from "../components/Layout/Layout";

export const ErrorPage404: FunctionComponent = ({}) => (
  <Layout pageTitle={`Ошибка`} header={<Header404 />} wrapperMode={"error"} footer={<Footer />}>
    <h1 className="visually-hidden">Ошибка 404</h1>
    <section className="error">
      <h2 className="error__title title title--big">Похоже ошиблись адресом</h2>
      <a className="error__link text text--big" href="/">
        Вернуться на главную
      </a>
    </section>
  </Layout>
);
