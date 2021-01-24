import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

export const LayoutFilled: FunctionComponent = ({children}) => (
  <Layout header={<Header />} footer={<Footer />}>
    {children}
  </Layout>
);
