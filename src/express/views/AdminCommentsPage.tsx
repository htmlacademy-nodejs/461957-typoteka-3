import React from "react";
import {Article} from "../../types/article";
import {Note} from "./components/Note/Note";
import {LayoutAdmin} from "./components/Layout/LayoutAdmin";
import {ArticleComment} from "../../types/article-comment";

interface Props {
  listOfComments: ArticleComment[];
}

export default function AdminCommentsPage(props: Props) {
  const listOfComments = props.listOfComments.map((comment, index, listOfComments) => {
    const isLastElement = index === listOfComments.length - 1;
    return (
      <li className={"notes__list-item" + (isLastElement ? "  notes__list-item--last" : "")} key={comment.id}>
        {JSON.stringify(comment)}
      </li>
    );
  });

  return (
    <LayoutAdmin>
      <main className="main-page main-page--padding">
        <section className="main-page__notes notes">
          <h1 className="notes__title">Комментарии</h1>
          <ul className="notes__list">{listOfComments}</ul>
        </section>
      </main>
    </LayoutAdmin>
  );
}
