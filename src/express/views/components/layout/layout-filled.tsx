import React, {FunctionComponent} from "react";

import {IPageTitle} from "../../../../types/interfaces/page-title";
import {ICurrentUser} from "../../interfaces/current-user";
import {Footer} from "../footer/footer";
import {HeaderDispatcher} from "../header/header-dispatcher";

import {Layout} from "./layout";

interface Props extends IPageTitle, ICurrentUser {}

const LayoutFilled: FunctionComponent<Props> = ({pageTitle, currentUser, children}) => (
  <Layout pageTitle={pageTitle} header={<HeaderDispatcher currentUser={currentUser} />} footer={<Footer />}>
    {children}
  </Layout>
);

export {LayoutFilled};
