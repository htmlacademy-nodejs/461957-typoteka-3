import React, {FunctionComponent} from "react";

import type {IArticleId, ICreatedDate, ILink, ITitle} from "../../../types/article";
import {LayoutAdmin} from "../components/Layout/LayoutAdmin";
import {Note} from "../components/Note/Note";
import {ICurrentUser} from "../interfaces/current-user";

interface AdminPublicationsPageProps extends ICurrentUser {
  articles: (ITitle & ICreatedDate & IArticleId & ILink)[];
}

const AdminPublicationsPage: FunctionComponent<AdminPublicationsPageProps> = (props: AdminPublicationsPageProps) => {
  const notesList = props.articles.map((article, index, articlesList) => {
    const isLastElement = index === articlesList.length - 1;
    return (
      <li className={"notes__list-item" + (isLastElement ? "  notes__list-item--last" : "")} key={article.id}>
        <Note title={article.title} createdDate={article.createdDate} link={article.link} />
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
