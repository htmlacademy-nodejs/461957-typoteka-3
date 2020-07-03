import React from "react";
import {LayoutFilled} from "./components/Layout/LayoutFilled";
import {Article} from "../../types/article";
import {Note} from "./components/Note/Note";

interface Props {
  articles: Article[];
}

export default function AdminPublicationsPage(props: Props) {
  const notesList = props.articles.map((article, index, articlesList) => {
    const isLastElement = index === articlesList.length - 1;
    return (
      <li className={"notes__list-item" + (isLastElement ? "  notes__list-item--last" : "")} key={article.id}>
        <Note title={article.title} createdDate={article.createdDate} />
      </li>
    );
  });

  return (
    <LayoutFilled>
      <main className="main-page main-page--padding">
        <section className="main-page__notes notes">
          <h1 className="notes__title">Мои записи</h1>
          <ul className="notes__list">{notesList}</ul>
        </section>
      </main>
    </LayoutFilled>
  );
}
