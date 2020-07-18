import React, {FunctionComponent} from "react";
import {EditArticle} from "../components/EditArticle/EditArticle";
import {LayoutFilled} from "../components/Layout/LayoutFilled";

interface NewArticlePageProps {}

export const NewArticlePage: FunctionComponent<NewArticlePageProps> = () => (
  <LayoutFilled>
    <main>
      <section className="modal modal--flex">
        <div className="popup popup--new-publication popup--flex">
          <EditArticle />
        </div>
      </section>
    </main>
  </LayoutFilled>
);
