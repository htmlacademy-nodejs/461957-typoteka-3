import React, {FunctionComponent} from "react";

import {IPageTitle} from "../../../../types/interfaces/page-title";
import {ICurrentUser} from "../../interfaces/current-user";
import {Footer} from "../Footer/Footer";
import {HeaderDispatcher} from "../Header/HeaderDispatcher";

import {Layout} from "./Layout";

interface LayoutAdminProps extends IPageTitle, ICurrentUser {}

export const LayoutAdmin: FunctionComponent<LayoutAdminProps> = ({children, pageTitle, currentUser}) => (
  <Layout
    pageTitle={pageTitle}
    wrapperMode={"admin"}
    header={<HeaderDispatcher currentUser={currentUser} />}
    footer={<Footer isLargeIndent={true} />}>
    {children}
  </Layout>
);
