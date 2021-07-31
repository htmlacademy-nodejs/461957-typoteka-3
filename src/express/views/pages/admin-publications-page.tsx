import React, {FunctionComponent} from "react";

import type {IArticleId, ICreatedDate, ITitle} from "../../../types/article";
import {LayoutAdmin} from "../components/layout/layout-admin";
import {Note} from "../components/note/note";
import {ICurrentUser} from "../interfaces/current-user";

interface AdminPublicationsPageProps extends ICurrentUser {
  articles: (ITitle & ICreatedDate & IArticleId)[];
}

const AdminPublicationsPage: FunctionComponent<AdminPublicationsPageProps> = (props: AdminPublicationsPageProps) => {
  const notesList = props.articles.map((article, index, articlesList) => {
    const isLastElement = index === articlesList.length - 1;
    return (
      <li className={"notes__list-item" + (isLastElement ? "  notes__list-item--last" : "")} key={article.id}>
        <Note title={article.title} createdDate={article.createdDate} link={`/articles/${article.id}`} />
      </li>
    );
  });

  return (
    <LayoutAdmin pageTitle={`Мои записи`} currentUser={props.currentUser}>
      <main className="main-page main-page--padding">
        <section className="main-page__notes notes">
          <h1 className="notes__title">Мои записи</h1>
          <ul className="notes__list">{notesList}</ul>
        </section>
      </main>
    </LayoutAdmin>
  );
};

export {AdminPublicationsPage};
