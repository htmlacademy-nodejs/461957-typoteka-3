import React, {FunctionComponent} from "react";
import {HeaderReader} from "./HeaderReader";
import {Header} from "./Header";
import {ICurrentUser} from "../../interfaces/current-user";
import {RoleId} from "../../../../shared/constants/role-id";
import {HeaderAuthor} from "./HeaderAuthor";

interface Props extends ICurrentUser {}

export const HeaderDispatcher: FunctionComponent<Props> = ({currentUser}) => {
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
