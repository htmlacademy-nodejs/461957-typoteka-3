import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {HeaderAuthorized} from "../Header/HeaderAuthorized";
import {IAuthorized} from "../../../../types/interfaces/authorized";

interface Props extends IAuthorized {}

export const LayoutFilled: FunctionComponent<Props> = ({isAuthorized, children}) => (
  <Layout header={isAuthorized ? <HeaderAuthorized /> : <Header />} footer={<Footer />}>
    {children}
  </Layout>
);
