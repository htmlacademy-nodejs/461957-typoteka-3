import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

interface LayoutAdminProps {
  pageTitle?: string;
}

export const LayoutAdmin: FunctionComponent<LayoutAdminProps> = ({children, pageTitle}) => (
  <Layout pageTitle={pageTitle} wrapperMode={"admin"} header={<Header />} footer={<Footer isLargeIndent={true} />}>
    {children}
  </Layout>
);
