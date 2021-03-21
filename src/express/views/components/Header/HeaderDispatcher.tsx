import React, {FunctionComponent} from "react";
import {HeaderAuthorized} from "./HeaderAuthorized";
import {Header} from "./Header";
import {ICurrentUser} from "../../interfaces/current-user";

interface Props extends ICurrentUser {}

export const HeaderDispatcher: FunctionComponent<Props> = ({currentUser}) =>
  currentUser?.id ? (
    <HeaderAuthorized
      firstName={currentUser?.firstName}
      lastName={currentUser?.lastName}
      avatar={currentUser?.avatar}
    />
  ) : (
    <Header />
  );
