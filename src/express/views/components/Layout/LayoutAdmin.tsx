import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Footer} from "../Footer/Footer";
import {IPageTitle} from "../../../../types/interfaces/page-title";
import {HeaderDispatcher} from "../Header/HeaderDispatcher";
import {ICurrentUser} from "../../interfaces/current-user";

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
