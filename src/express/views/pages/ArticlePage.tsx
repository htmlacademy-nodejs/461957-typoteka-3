import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import type {ICategoriesWithLinksAndNumbers, IComments, ICreatedDate, IFullText, ITitle} from "../../../types/article";
import {CategoriesList} from "../components/CategoriesList/CategoriesList";
import {CommentsList} from "../components/CommentsList/CommentsList";
import {CommentForm} from "../components/CommentForm/CommentForm";

export interface ArticlePageProps extends ITitle, ICreatedDate, ICategoriesWithLinksAndNumbers, IFullText, IComments {
  previousPageUrl: string;
  newCommentEndPoint: string;
}

export const ArticlePage: FunctionComponent<ArticlePageProps> = ({
  title,
  createdDate,
  categories,
  previousPageUrl,
  fullText,
  comments,
  newCommentEndPoint,
}) => (
  <LayoutFilled pageTitle={title}>
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
              <>
                <CommentForm endPoint={newCommentEndPoint} />
              </>
            </CommentsList>
          </div>
        </section>
      </section>
    </main>
  </LayoutFilled>
);
