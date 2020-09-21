import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

interface LayoutFilledProps {
  fixScroll?: boolean;
  addScripts?: boolean;
}

export const LayoutFilled: FunctionComponent<LayoutFilledProps> = ({children, fixScroll, addScripts}) => (
  <Layout header={<Header />} footer={<Footer />} addScripts={addScripts} fixScroll={fixScroll}>
    {children}
  </Layout>
);
