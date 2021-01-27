import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {CategoriesList} from "../components/CategoriesList/CategoriesList";
import {CategoryWithLinksAndNumbers} from "../../../types/category-with-links-and-numbers";
import {PreviewList} from "../components/PreviewList/PreviewList";
import {CategoryId} from "../../../types/category-id";
import {IArticlePreview} from "../../../types/interfaces/article-preview";
import {IPaginationProps, PaginationController} from "../components/Pagination/PaginationController";
import {ILink} from "../../../types/article";

interface Props extends IPaginationProps {
  pageTitle: string;
  categories: CategoryWithLinksAndNumbers[];
  articles: (IArticlePreview & ILink)[];
  selectedCategoryId?: CategoryId;
  prefix: string;
}

export const ArticlesByCategoryPage: FunctionComponent<Props> = ({
  pageTitle,
  categories,
  articles,
  selectedCategoryId,
  total,
  page,
  prefix,
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
            <PaginationController page={page} total={total} prefix={prefix} />
          </PreviewList>
        </section>
      </main>
    </LayoutFilled>
  );
};
