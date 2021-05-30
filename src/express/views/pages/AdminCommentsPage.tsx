import React, {FunctionComponent} from "react";
import {LayoutAdmin} from "../components/Layout/LayoutAdmin";
import {PublicationComment} from "../components/PublicationComment/PublicationComment";
import {ICurrentUser} from "../interfaces/current-user";
import {ILink} from "../../../types/article";
import {ICommentId} from "../../../types/interfaces/comment-id";

interface CommentProps extends ILink, ICommentId {
  text: string;
}

interface AdminCommentsPageProps extends ICurrentUser {
  comments: CommentProps[];
}

export const AdminCommentsPage: FunctionComponent<AdminCommentsPageProps> = (props: AdminCommentsPageProps) => {
  const listOfComments = props.comments.map((comment, index, listOfComments) => {
    const isLastElement = index === listOfComments.length - 1;
    return (
      <li
        className={"publication__list-item" + (isLastElement ? "  publication__list-item--last" : "")}
        key={comment.id}>
        <PublicationComment text={comment.text} link={comment.link} />
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
