import React, {FunctionComponent} from "react";

import {ILink} from "../../../types/article";
import {CategoryWithLink} from "../../../types/category-with-link";
import {CategoryWithLinksAndNumbers} from "../../../types/category-with-links-and-numbers";
import {IArticlePreview} from "../../../types/interfaces/article-preview";
import {CategoriesList} from "../components/CategoriesList/CategoriesList";
import {Greeting} from "../components/Greeting/Greeting";
import {HotProps} from "../components/Hot/Hot";
import {HotList} from "../components/HotList/HotList";
import {LastProps} from "../components/Last/Last";
import {LastList} from "../components/LastList/LastList";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {IPaginationProps, PaginationController} from "../components/Pagination/PaginationController";
import {PreviewList} from "../components/PreviewList/PreviewList";
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
