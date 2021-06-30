import {PrimaryButton} from "@fluentui/react";
import {IIconProps} from "@fluentui/react/lib/components/Icon";
import React, {FunctionComponent} from "react";

import {ClientRoute} from "../../../../../../shared/constants/routes/client-route";

const addIcon: IIconProps = {iconName: "Add"};

const NewArticleButton: FunctionComponent = () => (
  <PrimaryButton iconProps={addIcon} href={ClientRoute.ARTICLES.ADD}>
    Новая запись
  </PrimaryButton>
);

export {
  NewArticleButton,
};
