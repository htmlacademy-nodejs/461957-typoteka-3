import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import type {ICategoriesWithLinksAndNumbers, ICreatedDate, IFullText, ITitle} from "../../../types/article";
import {CategoriesList} from "../components/CategoriesList/CategoriesList";
import {CommentsList} from "../components/CommentsList/CommentsList";
import {CommentForm} from "../components/CommentForm/CommentForm";
import {CommentValidationResponse} from "../../../types/comment-validation-response";
import {CommentValidationErrors} from "../components/CommentValidationErrors/CommentValidationErrors";
import {ICurrentUser} from "../interfaces/current-user";
import {ICsrfInput} from "../interfaces/csrf-input";
import {ICommentPreview} from "../../../types/interfaces/comment-preview";

export interface ArticlePageProps
  extends ITitle,
    ICreatedDate,
    ICategoriesWithLinksAndNumbers,
    IFullText,
    ICurrentUser,
    ICsrfInput {
  previousPageUrl: string;
  newCommentEndPoint: string;
  commentValidationResponse?: CommentValidationResponse;
  comments: ICommentPreview[];
}

export const ArticlePage: FunctionComponent<ArticlePageProps> = ({
  title,
  createdDate,
  categories,
  previousPageUrl,
  fullText,
  comments,
  newCommentEndPoint,
  commentValidationResponse,
  currentUser,
  csrf,
}) => (
  <LayoutFilled pageTitle={title} currentUser={currentUser}>
    <main>
      <section className="post">
        <h1 className="visually-hidden">Пост</h1>
        <section className="post__content">
          <h2 className="visually-hidden">Основное содержание</h2>
          <div className="post__wrapper">
            <div className="post__head">
              <a href={previousPageUrl} className="post__backwards button button--backwards">
                Назад
              </a>
              <time className="post__date" dateTime={createdDate.toISOString()}>
                {createdDate.toLocaleString()}
              </time>
              <h2 className="post__title title title--main">{title}</h2>
              <h2 className="visually-hidden">Список тем</h2>
              <ul className="post__themes themes">
                <CategoriesList categories={categories} />
              </ul>
            </div>
            <div className="post__picture">
              <img src="https://via.placeholder.com/940x490.webp" alt="пейзаж море, скалы, пляж" />
            </div>
            <div className="post__text">
              <p>{fullText}</p>
            </div>
          </div>
          <div className="post__wrapper post__wrapper--comments">
            <CommentsList parentCssClass={"post"} comments={comments}>
              {currentUser ? (
                <>
                  <CommentForm endPoint={newCommentEndPoint} csrf={csrf} avatar={currentUser.avatar} />
                  {commentValidationResponse && (
                    <CommentValidationErrors validationResponse={commentValidationResponse} />
                  )}
                </>
              ) : null}
            </CommentsList>
          </div>
        </section>
      </section>
    </main>
  </LayoutFilled>
);
