import React, {FunctionComponent} from "react";

import {Footer} from "../components/footer/footer";
import {Header500} from "../components/header/header-500";
import {Layout} from "../components/layout/layout";

const ErrorPage500: FunctionComponent = ({}) => (
  <Layout pageTitle={`Ошибка`} header={<Header500 />} wrapperMode={"error"} footer={<Footer />}>
    <h1 className="visually-hidden">Ошибка 500</h1>
    <section className="error error--500">
      <h2 className="error__title title title--big">Что-то пошло не так</h2>
      <p className="error__text text text--big">
        Причин может быть много: сервер не выдержал нагрузку или в коде ошибка. Попробуйте повторить попытку позже.
      </p>
      <a className="error__link text text--big" href="/">
        Вернуться на главную
      </a>
    </section>
  </Layout>
);

export {ErrorPage500};
