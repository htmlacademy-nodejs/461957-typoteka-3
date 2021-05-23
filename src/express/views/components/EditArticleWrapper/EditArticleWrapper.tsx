import React, {FunctionComponent} from "react";

interface Props {}

export const EditArticleWrapper: FunctionComponent<Props> = ({children}) => {
  return (
    <main>
      <section>
        <div className="popup popup--new-publication popup--anti ms-depth-4">
          <div className="new-publication">{children}</div>
        </div>
      </section>
    </main>
  );
};
