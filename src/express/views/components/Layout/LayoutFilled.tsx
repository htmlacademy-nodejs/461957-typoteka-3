import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

interface LayoutFilledProps {}

export const LayoutFilled: FunctionComponent<LayoutFilledProps> = ({children}) => (
  <Layout header={<Header />} footer={<Footer />}>
    {children}
  </Layout>
);
