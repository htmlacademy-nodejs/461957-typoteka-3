import React, {FunctionComponent} from "react";

import {Footer} from "../components/footer/footer";
import {Header404} from "../components/header/header-404";
import {Layout} from "../components/layout/layout";

const ErrorPage404: FunctionComponent = ({}) => (
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

export {ErrorPage404};
