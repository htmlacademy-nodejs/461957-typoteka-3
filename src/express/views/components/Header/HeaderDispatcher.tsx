import React, {FunctionComponent} from "react";

import {RoleId} from "../../../../shared/constants/role-id";
import {ICurrentUser} from "../../interfaces/current-user";

import {Header} from "./Header";
import {HeaderAuthor} from "./HeaderAuthor";
import {HeaderReader} from "./HeaderReader";

export const HeaderDispatcher: FunctionComponent<ICurrentUser> = ({currentUser}) => {
  switch (currentUser?.roleId) {
    case RoleId.ADMIN:
    case RoleId.AUTHOR:
      return (
        <HeaderAuthor
          firstName={currentUser?.firstName}
          lastName={currentUser?.lastName}
          avatar={currentUser?.avatar}
        />
      );
    case RoleId.READER:
      return (
        <HeaderReader
          firstName={currentUser?.firstName}
          lastName={currentUser?.lastName}
          avatar={currentUser?.avatar}
        />
      );
    default:
      return <Header />;
  }
};
