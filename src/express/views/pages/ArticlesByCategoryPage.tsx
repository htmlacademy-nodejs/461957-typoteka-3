import {Text} from "@fluentui/react";
import React, {FunctionComponent} from "react";
import {ILink} from "../../../types/article";
import {CategoryId} from "../../../types/category-id";
import {CategoryWithLinksAndNumbers} from "../../../types/category-with-links-and-numbers";
import {IArticlePreview} from "../../../types/interfaces/article-preview";
import {CategoriesList} from "../components/CategoriesList/CategoriesList";

import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {IPaginationProps, PaginationController} from "../components/Pagination/PaginationController";
import {PreviewList} from "../components/PreviewList/PreviewList";
import {ICurrentUser} from "../interfaces/current-user";

interface Props extends IPaginationProps, ICurrentUser {
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
  currentUser,
}) => {
  return (
    <LayoutFilled pageTitle={pageTitle} currentUser={currentUser}>
      <main className="articles-category">
        <Text variant="mega" nowrap block className="articles-category__title">
          {pageTitle}
        </Text>
        <section className="articles-category__theme-list">
          <h2 className="visually-hidden">Список тем</h2>
          <ul className="themes">
            <CategoriesList categories={categories} selectedCategoryId={selectedCategoryId} />
          </ul>
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
