import React, {FunctionComponent} from "react";
import {EditArticle} from "../components/EditArticle/EditArticle";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {Article} from "../../../types/article";

interface NewArticlePageProps {
  article?: Article;
}

export const NewArticlePage: FunctionComponent<NewArticlePageProps> = ({article}) => (
  <LayoutFilled>
    <main>
      <section className="modal modal--flex">
        <div className="popup popup--new-publication popup--flex">
          <EditArticle article={article} />
        </div>
      </section>
    </main>
  </LayoutFilled>
);
