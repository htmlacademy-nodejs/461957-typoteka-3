import React, {FunctionComponent} from "react";
import {EditArticle} from "../components/EditArticle/EditArticle";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {Article} from "../../../types/article";
import {HttpMethod} from "../../../constants-es6";

interface NewArticlePageProps {
  article?: Article;
  endPoint: string;
  method: keyof typeof HttpMethod;
}

export const NewArticlePage: FunctionComponent<NewArticlePageProps> = ({article, endPoint, method}) => (
  <LayoutFilled>
    <main>
      <section className="modal modal--flex">
        <div className="popup popup--new-publication popup--flex">
          <EditArticle article={article} endPoint={endPoint} method={method} />
        </div>
      </section>
    </main>
  </LayoutFilled>
);
