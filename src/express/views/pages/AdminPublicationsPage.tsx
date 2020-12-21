import React, {FunctionComponent} from "react";
import type {Article} from "../../../types/article";
import {Note} from "../components/Note/Note";
import {LayoutAdmin} from "../components/Layout/LayoutAdmin";

interface AdminPublicationsPageProps {
  articles: Article[];
}

export const AdminPublicationsPage: FunctionComponent<AdminPublicationsPageProps> = (
  props: AdminPublicationsPageProps,
) => {
  const notesList = props.articles.map((article, index, articlesList) => {
    const isLastElement = index === articlesList.length - 1;
    return (
      <li className={"notes__list-item" + (isLastElement ? "  notes__list-item--last" : "")} key={article.id}>
        <Note title={article.title} createdDate={article.createdDate} link={`/articles/${article.id}`} />
      </li>
    );
  });

  return (
    <LayoutAdmin>
      <main className="main-page main-page--padding">
        <section className="main-page__notes notes">
          <h1 className="notes__title">Мои записи</h1>
          <ul className="notes__list">{notesList}</ul>
        </section>
      </main>
    </LayoutAdmin>
  );
};
