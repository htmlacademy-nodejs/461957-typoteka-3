import React, {FunctionComponent} from "react";

interface HotProps {
  title: string;
  link: string;
  count: number;
}

const Hot: FunctionComponent<HotProps> = ({count, title, link}) => {
  return (
    <a className="hot__list-link" href={link}>
      {title}
      <sup className="hot__link-sup">{count}</sup>
    </a>
  );
};

export {
  Hot,
  HotProps,
};
