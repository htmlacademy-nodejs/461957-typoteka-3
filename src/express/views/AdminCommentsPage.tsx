import React from "react";
import {LayoutAdmin} from "./components/Layout/LayoutAdmin";
import {ArticleComment} from "../../types/article-comment";
import {PublicationComment} from "./components/PublicationComment/PublicationComment";

interface Props {
  listOfComments: ArticleComment[];
}

export default function AdminCommentsPage(props: Props) {
  const listOfComments = props.listOfComments.map((comment, index, listOfComments) => {
    const isLastElement = index === listOfComments.length - 1;
    return (
      <li
        className={"publication__list-item" + (isLastElement ? "  publication__list-item--last" : "")}
        key={comment.id}
      >
        <PublicationComment text={comment.text} />
      </li>
    );
  });

  return (
    <LayoutAdmin>
      <main className="main-page main-page--padding">
        <section className="main-page__publication publication">
          <h1 className="publication__title">Комментарии</h1>
          <ul className="publication__list">{listOfComments}</ul>
        </section>
      </main>
    </LayoutAdmin>
  );
}
