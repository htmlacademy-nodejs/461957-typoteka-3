import React, {FunctionComponent} from "react";

interface HotProps {
  announce: string;
  link: string;
  count: number;
}

const Hot: FunctionComponent<HotProps> = ({count, announce, link}) => {
  return (
    <a className="hot__list-link" href={link}>
      {announce}
      <sup className="hot__link-sup">{count}</sup>
    </a>
  );
};

export {Hot, HotProps};
