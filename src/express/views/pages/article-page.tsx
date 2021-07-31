import React, {FunctionComponent} from "react";

import {CommentFormField} from "../../../shared/constants/forms/comment-form-field";
import type {ICategoriesWithLinksAndNumbers, ICreatedDate, IFullText, ITitle} from "../../../types/article";
import {CommentFormValidation} from "../../../types/form-fields/comment-form-validation";
import {ICommentPreview} from "../../../types/interfaces/comment-preview";
import {CategoriesList} from "../components/categories-list/categories-list";
import {CommentForm} from "../components/comment-form/comment-form";
import {CommentsList} from "../components/comments-list/comments-list";
import {FormValidationBlock} from "../components/form/form-validation-block";
import {LayoutFilled} from "../components/layout/layout-filled";
import {ICsrfInput} from "../interfaces/csrf-input";
import {ICurrentUser} from "../interfaces/current-user";

interface ArticlePageProps
  extends ITitle,
    ICreatedDate,
    ICategoriesWithLinksAndNumbers,
    IFullText,
    ICurrentUser,
    ICsrfInput {
  previousPageUrl: string;
  newCommentEndPoint: string;
  commentValidationResponse: CommentFormValidation;
  comments: ICommentPreview[];
  newComment?: string;
}

const ArticlePage: FunctionComponent<ArticlePageProps> = ({
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
  newComment,
}) => {
  const validationMessages = resolveValidationMessages(commentValidationResponse);
  return (
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
                    <CommentForm
                      text={newComment}
                      endPoint={newCommentEndPoint}
                      csrf={csrf}
                      avatar={currentUser.avatar}
                    />
                    {validationMessages.length ? (
                      <FormValidationBlock
                        title="При сохранении комментария произошли ошибки:"
                        messages={validationMessages}
                      />
                    ) : null}
                  </>
                ) : null}
              </CommentsList>
            </div>
          </section>
        </section>
      </main>
    </LayoutFilled>
  );
};

function resolveValidationMessages(validationResponse: Record<string, string>): [string, string][] {
  return Object.entries(validationResponse).map(([key, value]: [keyof typeof CommentFormField, string]) => [
    CommentFormField[key]?.label,
    value,
  ]);
}

export {ArticlePage, ArticlePageProps};
