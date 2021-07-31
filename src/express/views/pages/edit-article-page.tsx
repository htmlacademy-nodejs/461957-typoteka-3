import {IconButton, PrimaryButton, Stack, Text, TextField} from "@fluentui/react";
import {IIconProps} from "@fluentui/react/lib/components/Icon";
import React, {FunctionComponent} from "react";

import {ArticleFormField} from "../../../shared/constants/forms/article-form-field";
import {ClientRoute} from "../../../shared/constants/routes/client-route";
import type {Category} from "../../../types/category";
import {ArticleFormValidation} from "../../../types/form-fields/article-form-validation";
import {IArticleCreating} from "../../../types/interfaces/article-creating";
import {CategoriesSelect} from "../components/categories-select/categories-select";
import {CsrfHiddenInput} from "../components/csrf-hidden-input/csrf-hidden-input";
import {EditArticleWrapper} from "../components/edit-article-wrapper/edit-article-wrapper";
import {FormValidationBlock} from "../components/form/form-validation-block";
import {LayoutFilled} from "../components/layout/layout-filled";
import {ValidationMessage} from "../components/validation-message/validation-message";
import {ICsrfInput} from "../interfaces/csrf-input";
import {ICurrentUser} from "../interfaces/current-user";

interface EditArticleProps extends ICurrentUser, ICsrfInput {
  article?: Partial<IArticleCreating>;
  endPoint: string;
  availableCategories: Category[];
  articleValidationResponse: ArticleFormValidation;
  isUpdating?: boolean;
}

const closeButton: IIconProps = {iconName: "ChromeClose"};

const EditArticlePage: FunctionComponent<EditArticleProps> = ({
  article,
  endPoint,
  availableCategories,
  articleValidationResponse,
  isUpdating,
  currentUser,
  csrf,
}) => {
  const articleProps = {
    title: article?.title ?? ``,
    announce: article?.announce ?? ``,
    fullText: article?.fullText ?? ``,
    categories: article?.categories ?? [],
    createdDate: article?.createdDate ?? new Date(),
  };
  const validationMessages = resolveValidationMessages(articleValidationResponse);
  return (
    <LayoutFilled pageTitle={isUpdating ? `Редактирование публикации` : `Новая публикация`} currentUser={currentUser}>
      <EditArticleWrapper>
        <form action={endPoint} method="POST" encType="multipart/form-data" className="new-publication__wrapper">
          <div className="new-publication__header">
            <Text variant="xxLarge" block className="new-publication__page-title">
              {isUpdating ? `Редактирование публикации` : `Новая публикация`}
            </Text>
            <div className="datepicker">
              <span className="datepicker__title ms-fontSize-14 ms-fontWeight-semibold">Дата публикации</span>
              <div className="datepicker__wrapper">
                <label
                  className="datepicker__icon"
                  htmlFor="new-publication-date"
                  aria-label={ArticleFormField.CREATED_DATE.label}
                />
                <input
                  className="datepicker__input-filed"
                  type="date"
                  defaultValue={getInitialDate(articleProps.createdDate)}
                  name={ArticleFormField.CREATED_DATE.name}
                  id="new-publication-date"
                  placeholder={getInitialDate(articleProps.createdDate)}
                />
              </div>
            </div>
            <Stack tokens={{childrenGap: 16}} horizontal>
              <PrimaryButton type="submit">Опубликовать</PrimaryButton>
              <IconButton
                href={ClientRoute.INDEX}
                iconProps={closeButton}
                title="Закрыть окно"
                ariaLabel="Закрыть окно"
              />
            </Stack>
          </div>
          <div className="new-publication__form form">
            <div className="form__wrapper">
              {validationMessages.length ? (
                <FormValidationBlock title="При сохранении статьи произошли ошибки:" messages={validationMessages} />
              ) : null}
              <div className="form__field">
                <TextField
                  label={ArticleFormField.TITLE.label}
                  name={ArticleFormField.TITLE.name}
                  defaultValue={articleProps.title}
                  required
                />
                <ValidationMessage message={articleValidationResponse.TITLE} />
              </div>

              <div className="form__field">
                <div className="field-label ms-fontSize-14 ms-fontWeight-semibold">{ArticleFormField.UPLOAD.label}</div>
                <div className="file-uploader">
                  <label className="file-uploader__label" id="file-name" htmlFor="file-uploader" />
                  <label className="file-uploader__button">
                    <input
                      className="visually-hidden"
                      style={{width: "1px"}}
                      name={ArticleFormField.IMAGE.name}
                      type="file"
                      accept="image/png, image/jpeg"
                      id="file-uploader"
                    />
                    Обзор
                  </label>
                  <button className="button button--transparent file-uploader__button" type="button" id="file-clear">
                    Удалить
                  </button>
                </div>
              </div>
              <div className="form__field">
                <div className="field-label ms-fontSize-14 ms-fontWeight-semibold">
                  {ArticleFormField.CATEGORIES.label}
                </div>
                <CategoriesSelect
                  availableCategories={availableCategories}
                  selectedCategories={articleProps.categories}
                  inputName={ArticleFormField.CATEGORIES.name}
                />
                <ValidationMessage message={articleValidationResponse.CATEGORIES} />
              </div>
            </div>
            <div className="form__wrapper form__wrapper--text">
              <div className="form__field form__field--publication-text">
                <TextField
                  multiline
                  rows={5}
                  label={ArticleFormField.ANNOUNCE.label}
                  name={ArticleFormField.ANNOUNCE.name}
                  defaultValue={articleProps.announce}
                  required
                />
                <ValidationMessage message={articleValidationResponse.ANNOUNCE} />
              </div>
              <div className="form__field form__field--publication-text">
                <TextField
                  multiline
                  name={ArticleFormField.FULL_TEXT.name}
                  rows={10}
                  label={ArticleFormField.FULL_TEXT.label}
                  defaultValue={articleProps.fullText}
                  required
                />
                <ValidationMessage message={articleValidationResponse.FULL_TEXT} />
              </div>
            </div>
          </div>
          <CsrfHiddenInput csrf={csrf} />
        </form>
      </EditArticleWrapper>
    </LayoutFilled>
  );
};

function getInitialDate(date: Date): string {
  return date.toISOString().split("T", 1)[0];
}

function resolveValidationMessages(validationResponse: Record<string, string>): [string, string][] {
  return Object.entries(validationResponse).map(([key, value]: [keyof typeof ArticleFormField, string]) => [
    ArticleFormField[key]?.label,
    value,
  ]);
}

export {EditArticlePage};
