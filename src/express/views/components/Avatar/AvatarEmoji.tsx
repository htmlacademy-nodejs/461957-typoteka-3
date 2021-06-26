import React, {FunctionComponent} from "react";

import {AvatarSize} from "./models/avatar-sizes";

const sizesCssClasses: Record<AvatarSize, string> = {
  small: `avatar-emoji__size_small`,
  medium: `avatar-emoji__size_medium`,
};

interface Props {
  emoji: string;
  size: AvatarSize;
}

export const AvatarEmoji: FunctionComponent<Props> = ({emoji, size}) => (
  <div className={`avatar-emoji ${sizesCssClasses[size]}`}>{emoji}</div>
);
