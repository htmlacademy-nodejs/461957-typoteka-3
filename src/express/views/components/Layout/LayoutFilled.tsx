import React, {FunctionComponent} from "react";
import {Layout} from "./Layout";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {HeaderAuthorized} from "../Header/HeaderAuthorized";
import {IPageTitle} from "../../../../types/interfaces/page-title";
import {IUserPreview} from "../../../../types/interfaces/user-preview";

interface Props extends IPageTitle {
  currentUser?: IUserPreview;
}

export const LayoutFilled: FunctionComponent<Props> = ({pageTitle, currentUser, children}) => (
  <Layout
    pageTitle={pageTitle}
    header={
      currentUser?.id ? (
        <HeaderAuthorized
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          avatar={currentUser.avatar}
        />
      ) : (
        <Header />
      )
    }
    footer={<Footer />}>
    {children}
  </Layout>
);
