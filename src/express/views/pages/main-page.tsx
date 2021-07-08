import React, {FunctionComponent} from "react";

import {ILink} from "../../../types/article";
import {CategoryWithLink} from "../../../types/category-with-link";
import {CategoryWithLinksAndNumbers} from "../../../types/category-with-links-and-numbers";
import {IArticlePreview} from "../../../types/interfaces/article-preview";
import {CategoriesList} from "../components/categories-list/categories-list";
import {Greeting} from "../components/greeting/greeting";
import {HotProps} from "../components/hot/hot";
import {HotList} from "../components/hot-list/hot-list";
import {LastProps} from "../components/last/last";
import {LastList} from "../components/last-list/last-list";
import {LayoutFilled} from "../components/layout/layout-filled";
import {IPaginationProps, PaginationController} from "../components/pagination/pagination-controller";
import {PreviewList} from "../components/preview-list/preview-list";
import {ICurrentUser} from "../interfaces/current-user";

interface MainPageProps extends IPaginationProps, ICurrentUser {
  articles?: (IArticlePreview & ILink)[];
  categoriesWithLinksAndNumbers: CategoryWithLinksAndNumbers[];
  categoriesWithLinks: CategoryWithLink[];
  prefix: string;
  lastComments: LastProps[];
  discussedArticles: HotProps[];
}

const MainPage: FunctionComponent<MainPageProps> = ({
  articles,
  categoriesWithLinksAndNumbers,
  categoriesWithLinks,
  page,
  total,
  prefix,
  currentUser,
  lastComments,
  discussedArticles,
}) => {
  return (
    <LayoutFilled currentUser={currentUser}>
      <main className="main-page">
        <Greeting />
        <section className="main-page__theme-list">
          <h2 className="visually-hidden">Список тем</h2>
          <ul className="themes">
            <CategoriesList categories={categoriesWithLinksAndNumbers} />
          </ul>
        </section>
        <div className="main-page__section-flex">
          <HotList listOfHot={discussedArticles} />
          <LastList listOfLast={lastComments} />
        </div>
        <PreviewList previews={articles} categories={categoriesWithLinks}>
          <PaginationController page={page} total={total} prefix={prefix} />
        </PreviewList>
      </main>
    </LayoutFilled>
  );
};

export {MainPage};
