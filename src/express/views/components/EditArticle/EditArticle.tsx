import React, {FunctionComponent} from "react";
import {Article} from "../../../../types/article";
import {ARTICLE_FORM_FIELDS} from "../../../../constants-es6";
import {ArticleValidationResponse} from "../../../../types/article-validation-response";
import {FormValidationBlock} from "../Form/FormValidationBlock";
import {FormValidationMessage} from "../Form/FormValidationMessage";
import {ValidationError} from "../../../../service/errors/validation-error";
import {ValidationMessage} from "../../../../types/validation-message";

interface EditArticleProps {
  article?: Partial<Article>;
  endPoint: string;
  articleValidationResponse?: ArticleValidationResponse;
}

export const EditArticle: FunctionComponent<EditArticleProps> = ({article, endPoint, articleValidationResponse}) => {
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
            <div className="new-publication__date-form-division">
              <div className="new-publication__date-block" style={{position: "relative"}}>
                <label htmlFor="new-publication-date" aria-label="Календарь" />
                <input
                  type="text"
                  name={ARTICLE_FORM_FIELDS.Login}
                  id="new-publication-date"
                  placeholder="21.03.2019"
                />
              </div>
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
          {articleValidationResponse ? (
            <FormValidationBlock title={"При сохранении статьи произошли ошибки:"}>
              {Object.entries(articleValidationResponse).map(([key, validation]) => (
                <FormValidationMessage key={key}>{getValidationMessageText(key, validation)}</FormValidationMessage>
              ))}
            </FormValidationBlock>
          ) : null}
          <div className="form__wrapper form__wrapper--intro">
            <div className="form__field">
              <label>
                <input
                  type="text"
                  name={ARTICLE_FORM_FIELDS.Title}
                  placeholder="Заголовок"
                  defaultValue={articleProps.title}
                  required
                />
              </label>
            </div>
            <div className="form__field form__field--post-image">
              <label>
                <input id="image-name-field" type="text" placeholder="Фотография" readOnly />
              </label>
              <div className="form__image-loader form__image-loader--publication">
                <label>
                  <input className="visually-hidden" name={ARTICLE_FORM_FIELDS.Image} type="file" disabled />
                  Обзор
                </label>
              </div>
              {/* TODO: remove image button
               <button className="button button--transparent">Удалить</button>
               */}
            </div>
            {/* TODO: Categories checkboxes
            <div className="new-publication__checkbox new-publication__checkbox--auto">
              <input type="checkbox" name="checkbox-auto" id="checkbox-auto" />
              <label htmlFor="checkbox-auto">Автомобили</label>
            </div>
            */}
            <a className="new-publication__form-link button button--transparent" href="#">
              Добавить категорию
            </a>
          </div>
          <div className="form__wrapper form__wrapper--text">
            <div className="form__field form__field--publication-text">
              <label>
                <textarea
                  rows={2}
                  placeholder="Анонс публикации"
                  name={ARTICLE_FORM_FIELDS.Announce}
                  value={articleProps.announce}
                  onChange={() => {}}
                />
              </label>
            </div>
            <div className="form__field form__field--publication-text">
              <label>
                <textarea
                  name={ARTICLE_FORM_FIELDS.FullText}
                  rows={5}
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

function getValidationMessageText(key: string, validation: ValidationMessage): string {
  if (validation.state === ValidationError.INVALID) {
    return validation.message;
  }
  return `Обязательное поле` + (validation.message ? `. ${validation.message}` : ``);
}
