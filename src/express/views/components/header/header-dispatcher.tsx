import React, {FunctionComponent} from "react";

import {RoleId} from "../../../../shared/constants/role-id";
import {ICurrentUser} from "../../interfaces/current-user";

import {Header} from "./header";
import {HeaderAuthor} from "./header-author";
import {HeaderReader} from "./header-reader";

const HeaderDispatcher: FunctionComponent<ICurrentUser> = ({currentUser}) => {
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

export {HeaderDispatcher};
