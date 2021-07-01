import React, {FunctionComponent} from "react";

import {IPageTitle} from "../../../../types/interfaces/page-title";
import {ICurrentUser} from "../../interfaces/current-user";
import {Footer} from "../Footer/Footer";
import {HeaderDispatcher} from "../Header/HeaderDispatcher";

import {Layout} from "./Layout";

interface Props extends IPageTitle, ICurrentUser {}

const LayoutFilled: FunctionComponent<Props> = ({pageTitle, currentUser, children}) => (
  <Layout pageTitle={pageTitle} header={<HeaderDispatcher currentUser={currentUser} />} footer={<Footer />}>
    {children}
  </Layout>
);

export {
  LayoutFilled,
};
