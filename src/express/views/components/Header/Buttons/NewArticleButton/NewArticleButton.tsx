import {PrimaryButton} from "@fluentui/react";
import {IIconProps} from "@fluentui/react/lib/components/Icon";
import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../../../constants-es6";

const addIcon: IIconProps = {iconName: "Add"};

export const NewArticleButton: FunctionComponent = () => (
  <PrimaryButton iconProps={addIcon} href={ClientRoute.ARTICLES.ADD}>
    Новая запись
  </PrimaryButton>
);
