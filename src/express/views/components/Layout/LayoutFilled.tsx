import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Footer} from "../Footer/Footer";
import {IPageTitle} from "../../../../types/interfaces/page-title";
import {HeaderDispatcher} from "../Header/HeaderDispatcher";
import {ICurrentUser} from "../../pages/interfaces/current-user";

interface Props extends IPageTitle, ICurrentUser {}

export const LayoutFilled: FunctionComponent<Props> = ({pageTitle, currentUser, children}) => (
  <Layout pageTitle={pageTitle} header={<HeaderDispatcher currentUser={currentUser} />} footer={<Footer />}>
    {children}
  </Layout>
);
