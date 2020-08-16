import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

interface LayoutFilledProps {
  fixScroll?: boolean;
}

export const LayoutFilled: FunctionComponent<LayoutFilledProps> = ({children, fixScroll}) => (
  <Layout header={<Header />} footer={<Footer />} fixScroll={fixScroll}>
    {children}
  </Layout>
);
