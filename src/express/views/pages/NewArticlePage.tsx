import React, {FunctionComponent} from "react";
import {EditArticle} from "../components/EditArticle/EditArticle";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {Article} from "../../../types/article";

interface NewArticlePageProps {
  article?: Article;
  endPoint: string;
}

export const NewArticlePage: FunctionComponent<NewArticlePageProps> = ({article, endPoint}) => (
  <LayoutFilled fixScroll={true} addScripts={true}>
    <main>
      <section className="modal modal--flex">
        <div className="popup popup--new-publication popup--flex">
          <EditArticle article={article} endPoint={endPoint} />
        </div>
      </section>
    </main>
  </LayoutFilled>
);
