import React, {FunctionComponent} from "react";

export interface HotProps {
  title: string;
  link: string;
  count: number;
}

export const Hot: FunctionComponent<HotProps> = ({count, title, link}) => {
  return (
    <a className="hot__list-link" href={link}>
      {title}
      <sup className="hot__link-sup">{count}</sup>
    </a>
  );
};
