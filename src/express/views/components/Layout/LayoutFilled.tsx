import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {HeaderAuthorized} from "../Header/HeaderAuthorized";
import {IAuthorized} from "../../../../types/interfaces/authorized";
import {IPageTitle} from "../../../../types/interfaces/page-title";

interface Props extends IAuthorized, IPageTitle {}

export const LayoutFilled: FunctionComponent<Props> = ({isAuthorized, pageTitle, children}) => (
  <Layout pageTitle={pageTitle} header={isAuthorized ? <HeaderAuthorized /> : <Header />} footer={<Footer />}>
    {children}
  </Layout>
);
