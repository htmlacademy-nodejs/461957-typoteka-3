import React, {FunctionComponent} from "react";
import {Article} from "../../../../types/article";

interface EditArticleProps {
  article?: Article;
  endPoint: string;
}

export const EditArticle: FunctionComponent<EditArticleProps> = ({article, endPoint}) => {
  const articleProps =
    article === undefined
      ? {
          title: "",
          announce: "",
          fullText: "",
        }
      : {
          title: article.title,
          announce: article.announce,
          fullText: article.fullText,
        };

  return (
    <div className="new-publication">
      <form action={endPoint} method="POST" encType="multipart/form-data">
        <div className="new-publication__header">
          <h1>Новая публикация</h1>
          <div className="new-publication__date-form">
            <h3>Дата публикации</h3>
            <div className="new-publication__date-block" style={{position: "relative"}}>
              <label htmlFor="new-publication-date" aria-label="Календарь" />
              <input type="text" name="login" id="new-publication-date" placeholder="21.03.2019" />
            </div>
          </div>
          <button type="submit" className="new-publication__button button button--colored">
            Опубликовать
          </button>
        </div>
        <button type="button" className="popup__button button button--popup-close" aria-label="Закрыть окно">
          Закрыть окно
        </button>
        <div className="new-publication__form form">
          <div className="form__wrapper form__wrapper--intro">
            <div className="form__field">
              <label>
                <input type="text" name="title" placeholder="Заголовок" defaultValue={articleProps.title} required />
              </label>
            </div>
            <div className="form__field form__field--post-image">
              <label>
                <input id="image-name-field" type="text" placeholder="Фотография" readOnly />
              </label>
              <div className="form__image-loader form__image-loader--publication">
                <label>
                  <input className="visually-hidden" name="image" type="file" />
                  Обзор
                </label>
              </div>
            </div>
            <a className="new-publication__form-link button button--transparent" href="#">
              Добавить категорию
            </a>
          </div>
          <div className="form__wrapper form__wrapper--text">
            <div className="form__field form__field--publication-text">
              <label>
                <textarea
                  rows={1}
                  placeholder="Анонс публикации"
                  name="announce"
                  value={articleProps.announce}
                  onChange={() => {}}
                />
              </label>
            </div>
            <div className="form__field form__field--publication-text">
              <label>
                <textarea
                  name="fullText"
                  rows={1}
                  placeholder="Полный текст публикации"
                  value={articleProps.fullText}
                  onChange={() => {}}
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
