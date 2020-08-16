import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {Article} from "../../../types/article";

interface ArticlePageProps {
  article?: Article;
}

export const ArticlePage: FunctionComponent<ArticlePageProps> = ({article}) => (
  <LayoutFilled addScripts={true}>
    <main>
      <section className="post">
        <code>{JSON.stringify(article, undefined, 2)}</code>
      </section>
    </main>
  </LayoutFilled>
);
