import React, {FunctionComponent} from "react";
import {PrimaryButton} from "@fluentui/react";
import {ClientRoutes} from "../../../../../../constants-es6";
import {IIconProps} from "@fluentui/react/lib/components/Icon";

const addIcon: IIconProps = {iconName: "Add"};

export const NewArticleButton: FunctionComponent = () => (
  <PrimaryButton iconProps={addIcon} href={ClientRoutes.ARTICLES.ADD}>
    Новая запись
  </PrimaryButton>
);
