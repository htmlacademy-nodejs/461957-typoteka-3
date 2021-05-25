import React, {FunctionComponent} from "react";

interface Props {
  avatar?: string;
  cssClass?: string;
}

export const Avatar: FunctionComponent<Props> = ({avatar, cssClass}) => (
  <div className={"avatar " + (cssClass ?? "")}>
    {avatar ? (
      <AvatarEmoji emoji={avatar} />
    ) : (
      <img src="https://via.placeholder.com/50x50.webp" alt="аватар пользователя" />
    )}
  </div>
);

const AvatarEmoji = ({emoji}: {emoji: string}) => <div className="avatar-emoji">{emoji}</div>;
