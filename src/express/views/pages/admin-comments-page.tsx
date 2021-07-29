import React, {FunctionComponent} from "react";

import type {ICommentId} from "../../../types/interfaces/comment-id";
import {ICommentByAuthor} from "../../../types/interfaces/comment-by-author";
import {LayoutAdmin} from "../components/Layout/layout-admin";
import {PublicationComment} from "../components/publication-comment/publication-comment";
import {ICurrentUser} from "../interfaces/current-user";

interface AdminCommentsPageProps extends ICurrentUser {
  comments: (ICommentByAuthor & ICommentId)[];
}

const AdminCommentsPage: FunctionComponent<AdminCommentsPageProps> = (props: AdminCommentsPageProps) => {
  const listOfComments = props.comments.map((comment, index, list) => {
    const isLastElement = index === list.length - 1;
    return (
      <li
        className={"publication__list-item" + (isLastElement ? "  publication__list-item--last" : "")}
        key={comment.id}>
        <PublicationComment
          articleTitle={comment.articleTitle}
          text={comment.text}
          link={comment.link}
          user={comment.user}
          createdDate={comment.createdDate}
        />
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

export {AdminCommentsPage};
