import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {CategoriesList} from "../components/CategoriesList/CategoriesList";
import {CategoryWithLinksAndNumbers} from "../../../types/category-with-links-and-numbers";
import {PreviewList} from "../components/PreviewList/PreviewList";
import {CategoryId} from "../../../types/category-id";
import {IArticlePreview} from "../../../types/interfaces/article-preview";
import {Pagination} from "../components/Pagination/Pagination";

interface Props {
  pageTitle: string;
  categories: CategoryWithLinksAndNumbers[];
  articles: IArticlePreview[];
  selectedCategoryId?: CategoryId;
}

export const ArticlesByCategoryPage: FunctionComponent<Props> = ({
  pageTitle,
  categories,
  articles,
  selectedCategoryId,
}) => {
  return (
    <LayoutFilled>
      <main className="articles-category">
        <h1>{pageTitle}</h1>
        <section className="articles-category__theme-list">
          <CategoriesList categories={categories} selectedCategoryId={selectedCategoryId} />
        </section>
        <section className="articles-category__list preview">
          <PreviewList previews={articles} categories={categories}>
            <Pagination parentCssClass={"preview"} min={1} max={5} current={1} hasNext={true} hasPrev={false} />
          </PreviewList>
        </section>
      </main>
    </LayoutFilled>
  );
};
