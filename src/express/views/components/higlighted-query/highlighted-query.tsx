import React, {FunctionComponent} from "react";

interface Props {
  text: string;
  match: string;
}

const Query: FunctionComponent = ({children}) => (
  <mark>
    <b>{children}</b>
  </mark>
);

const HighlightedQuery: FunctionComponent<Props> = ({text, match}) => {
  if (!match) {
    return <>{text}</>;
  }
  const matchRegexp = new RegExp(match, `gi`);
  const title = text.split(matchRegexp);
  console.log(title);
  return title
    .map(item => <>{item}</>)
    .reduce((prev, current) => (
      <>
        {prev}
        <Query>{match}</Query>
        {current}
      </>
    ));
};

export {
  HighlightedQuery,
};
