import React, {FunctionComponent} from "react";

type AvatarSize = `small` | `medium`;

interface Props {
  avatar?: string;
  cssClass?: string;
  size?: AvatarSize;
}

const sizesPxs: Record<AvatarSize, number> = {
  small: 20,
  medium: 50,
};

const sizesCssClasses: Record<AvatarSize, string> = {
  small: `avatar-emoji__size_small`,
  medium: `avatar-emoji__size_medium`,
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

const AvatarEmoji = ({emoji, size}: {emoji: string; size: AvatarSize}) => (
  <div className={`avatar-emoji ${sizesCssClasses[size]}`}>{emoji}</div>
);
