import React, {FunctionComponent} from "react";
import {LayoutAdmin} from "../components/Layout/LayoutAdmin";
import type {ArticleComment} from "../../../types/article-comment";
import {PublicationComment} from "../components/PublicationComment/PublicationComment";
import {ICurrentUser} from "../interfaces/current-user";

interface AdminCommentsPageProps extends ICurrentUser {
  listOfComments: ArticleComment[];
}

export const AdminCommentsPage: FunctionComponent<AdminCommentsPageProps> = (props: AdminCommentsPageProps) => {
  const listOfComments = props.listOfComments.map((comment, index, listOfComments) => {
    const isLastElement = index === listOfComments.length - 1;
    return (
      <li
        className={"publication__list-item" + (isLastElement ? "  publication__list-item--last" : "")}
        key={comment.id}>
        <PublicationComment text={comment.text} />
      </li>
    );
  });

  return (
    <LayoutAdmin pageTitle={`Комментарии`} currentUser={props.currentUser}>
      <main className="main-page main-page--padding">
        <section className="main-page__publication publication">
          <h1 className="publication__title">Комментарии</h1>
          <ul className="publication__list">{listOfComments}</ul>
        </section>
      </main>
    </LayoutAdmin>
  );
};
