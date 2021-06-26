import React, {FunctionComponent} from "react";
import {AvatarEmoji} from "./AvatarEmoji";

import {AvatarSize} from "./models/avatar-sizes";

interface Props {
  avatar?: string;
  cssClass?: string;
  size?: AvatarSize;
}

const sizesPxs: Record<AvatarSize, number> = {
  small: 20,
  medium: 50,
};

export const Avatar: FunctionComponent<Props> = ({avatar, cssClass, size = `medium`}) => {
  const imageSize = sizesPxs[size];
  return (
    <div className={cssClass ?? ""}>
      {avatar ? (
        <AvatarEmoji emoji={avatar} size={size} />
      ) : (
        <img src={`https://via.placeholder.com/${imageSize}x${imageSize}.webp`} alt="аватар пользователя" />
      )}
    </div>
  );
};
