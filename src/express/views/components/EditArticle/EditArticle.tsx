import React, {FunctionComponent} from "react";
import type {Article} from "../../../../types/article";
import {ARTICLE_FORM_FIELDS} from "../../../../constants-es6";
import type {ArticleValidationResponse} from "../../../../types/article-validation-response";
import {FormValidationBlock} from "../Form/FormValidationBlock";
import {FormValidationMessage} from "../Form/FormValidationMessage";
import {ValidationError} from "../../../../shared/errors/validation-error";
import type {ValidationMessage} from "../../../../types/validation-message";
import {LayoutFilled} from "../Layout/LayoutFilled";
import {FieldValidationBlock} from "../Form/FieldVlidationBlock";
import {CategoriesSelect} from "./CategoriesSelect";
import type {Category} from "../../../../types/category";

interface EditArticleProps {
  article?: Partial<Article>;
  endPoint: string;
  availableCategories: Category[];
  articleValidationResponse?: ArticleValidationResponse;
}

export const EditArticle: FunctionComponent<EditArticleProps> = ({
  article,
  endPoint,
  availableCategories,
  articleValidationResponse = {},
}) => {
  const articleProps =
    article === undefined
      ? {
          title: "",
          announce: "",
          fullText: "",
          category: [],
        }
      : {
          title: article.title,
          announce: article.announce,
          fullText: article.fullText,
          category: article.category,
        };

  return (
    <LayoutFilled>
      <main>
        <section>
          <div className="popup popup--new-publication popup--anti">
            <div className="new-publication">
              <form action={endPoint} method="POST" encType="multipart/form-data">
                <div className="new-publication__header">
                  <h1>Новая публикация</h1>
                  <div className="new-publication__date-form">
                    <h3>Дата публикации</h3>
                    <div className="new-publication__date-form-division">
                      <div className="new-publication__date-block" style={{position: "relative"}}>
                        <label htmlFor="new-publication-date" aria-label={ARTICLE_FORM_FIELDS.createdDate.label} />
                        <input
                          type="text"
                          defaultValue={getInitialDate()}
                          name={ARTICLE_FORM_FIELDS.createdDate.name}
                          id="new-publication-date"
                          placeholder="2019-03-21"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="new-publication__button button button--colored">
                    Опубликовать
                  </button>
                </div>
                <a type="button" className="popup__button button button--popup-close" aria-label="Закрыть окно">
                  Закрыть окно
                </a>
                <div className="new-publication__form form">
                  {Object.keys(articleValidationResponse).length ? (
                    <FormValidationBlock title={"При сохранении статьи произошли ошибки:"}>
                      {Object.entries(articleValidationResponse).map(([key, validation]) => (
                        <FormValidationMessage key={key}>
                          <strong>{ARTICLE_FORM_FIELDS[key]?.label}:</strong>{" "}
                          {getValidationMessageText(key, validation)}
                        </FormValidationMessage>
                      ))}
                    </FormValidationBlock>
                  ) : null}
                  <div className="form__wrapper form__wrapper--intro">
                    <div className="form__field">
                      <label>
                        <input
                          type="text"
                          name={ARTICLE_FORM_FIELDS.title.name}
                          placeholder={ARTICLE_FORM_FIELDS.title.label}
                          defaultValue={articleProps.title}
                          required
                        />
                      </label>
                      {articleValidationResponse[ARTICLE_FORM_FIELDS.title.name] ? (
                        <FieldValidationBlock>
                          <FormValidationMessage>
                            {getValidationMessageText(
                              ARTICLE_FORM_FIELDS.title.label,
                              articleValidationResponse[ARTICLE_FORM_FIELDS.title.name],
                            )}
                          </FormValidationMessage>
                        </FieldValidationBlock>
                      ) : null}
                    </div>
                    <div className="form__field form__field--post-image">
                      <label>
                        <input
                          id="image-name-field"
                          name={ARTICLE_FORM_FIELDS.Upload.name}
                          type="text"
                          placeholder={ARTICLE_FORM_FIELDS.Upload.label}
                          readOnly
                        />
                      </label>
                      <div className="form__image-loader form__image-loader--publication">
                        <label>
                          <input
                            className="visually-hidden"
                            style={{width: "1px"}}
                            name={ARTICLE_FORM_FIELDS.Image.name}
                            type="file"
                            disabled
                          />
                          Обзор
                        </label>
                      </div>
                      {/* TODO: remove image button
               <button className="button button--transparent">Удалить</button>
               */}
                    </div>
                    <CategoriesSelect
                      availableCategories={availableCategories}
                      selectedCategories={articleProps.category}
                      inputName={ARTICLE_FORM_FIELDS.category.name}
                    />
                  </div>
                  <div className="form__wrapper form__wrapper--text">
                    <div className="form__field form__field--publication-text">
                      <label>
                        <textarea
                          rows={5}
                          placeholder={ARTICLE_FORM_FIELDS.announce.label}
                          name={ARTICLE_FORM_FIELDS.announce.name}
                          value={articleProps.announce}
                          onChange={() => {}}
                        />
                      </label>
                      {articleValidationResponse[ARTICLE_FORM_FIELDS.announce.name] ? (
                        <FieldValidationBlock>
                          <FormValidationMessage>
                            {getValidationMessageText(
                              ARTICLE_FORM_FIELDS.announce.label,
                              articleValidationResponse[ARTICLE_FORM_FIELDS.announce.name],
                            )}
                          </FormValidationMessage>
                        </FieldValidationBlock>
                      ) : null}
                    </div>
                    <div className="form__field form__field--publication-text">
                      <label>
                        <textarea
                          name={ARTICLE_FORM_FIELDS.fullText.name}
                          rows={10}
                          placeholder={ARTICLE_FORM_FIELDS.fullText.label}
                          value={articleProps.fullText}
                          onChange={() => {}}
                        />
                      </label>
                      {articleValidationResponse[ARTICLE_FORM_FIELDS.fullText.name] ? (
                        <FieldValidationBlock>
                          <FormValidationMessage>
                            {getValidationMessageText(
                              ARTICLE_FORM_FIELDS.fullText.label,
                              articleValidationResponse[ARTICLE_FORM_FIELDS.fullText.name],
                            )}
                          </FormValidationMessage>
                        </FieldValidationBlock>
                      ) : null}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </LayoutFilled>
  );
};

function getValidationMessageText(key: string, validation: ValidationMessage): string {
  if (validation.state === ValidationError.INVALID) {
    return validation.message;
  }
  return `Обязательное поле` + (validation.message ? `. ${validation.message}` : ``);
}

function getInitialDate(): string {
  return new Date().toISOString().substr(0, 10);
}
