import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {CategoriesList} from "../components/CategoriesList/CategoriesList";
import {CategoryWithLinksAndNumbers} from "../../../types/category-with-links-and-numbers";
import {PreviewList} from "../components/PreviewList/PreviewList";
import {Article} from "../../../types/article";

interface Props {
  pageTitle: string;
  categories: CategoryWithLinksAndNumbers[],
  articles: Article[],
}

export const ArticlesByCategoryPage: FunctionComponent<Props> = ({pageTitle, categories, articles}) => {
  return (
    <LayoutFilled>
      <main className="articles-category">
        <h1>{pageTitle}</h1>
        <section className="articles-category__theme-list">
          <CategoriesList categories={categories} />
        </section>
        <section className="articles-category__list preview">
          <PreviewList previews={articles} categories={categories} />
        </section>
      </main>
    </LayoutFilled>
  );
};
