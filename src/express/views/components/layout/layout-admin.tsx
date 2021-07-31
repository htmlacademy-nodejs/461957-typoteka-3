import React, {FunctionComponent} from "react";

import {IPageTitle} from "../../../../types/interfaces/page-title";
import {ICurrentUser} from "../../interfaces/current-user";
import {Footer} from "../footer/footer";
import {HeaderDispatcher} from "../header/header-dispatcher";

import {Layout} from "./layout";

interface LayoutAdminProps extends IPageTitle, ICurrentUser {}

const LayoutAdmin: FunctionComponent<LayoutAdminProps> = ({children, pageTitle, currentUser}) => (
  <Layout
    pageTitle={pageTitle}
    wrapperMode={"admin"}
    header={<HeaderDispatcher currentUser={currentUser} />}
    footer={<Footer isLargeIndent={true} />}>
    {children}
  </Layout>
);

export {LayoutAdmin};
