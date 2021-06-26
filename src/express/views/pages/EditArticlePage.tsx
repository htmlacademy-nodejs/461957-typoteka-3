import React, {FunctionComponent} from "react";
import {ARTICLE_FORM_FIELDS, ClientRoutes} from "../../../constants-es6";
import type {ArticleValidationResponse} from "../../../types/article-validation-response";
import {FormValidationBlock} from "../components/Form/FormValidationBlock";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {CategoriesSelect} from "../components/CategoriesSelect/CategoriesSelect";
import type {Category} from "../../../types/category";
import {IArticleCreating} from "../../../types/interfaces/article-creating";
import {ValidationMessage} from "../components/ValidationMessage/ValidationMessage";
import {EditArticleWrapper} from "../components/EditArticleWrapper/EditArticleWrapper";
import {ICurrentUser} from "../interfaces/current-user";
import {CsrfHiddenInput} from "../components/CsrfHiddenInput/CsrfHiddenInput";
import {ICsrfInput} from "../interfaces/csrf-input";
import {IconButton, PrimaryButton, Stack, Text, TextField} from "@fluentui/react";
import {IIconProps} from "@fluentui/react/lib/components/Icon";

interface EditArticleProps extends ICurrentUser, ICsrfInput {
  article?: Partial<IArticleCreating>;
  endPoint: string;
  availableCategories: Category[];
  articleValidationResponse: ArticleValidationResponse;
  isUpdating?: boolean;
}

const closeButton: IIconProps = {iconName: "ChromeClose"};

export const EditArticlePage: FunctionComponent<EditArticleProps> = ({
  article,
  endPoint,
  availableCategories,
  articleValidationResponse = {},
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
            <div className="new-publication__date-form">
              <h3>Дата публикации</h3>
              <div className="new-publication__date-form-division">
                <div className="new-publication__date-block" style={{position: "relative"}}>
                  <label htmlFor="new-publication-date" aria-label={ARTICLE_FORM_FIELDS.createdDate.label} />
                  <input
                    type="text"
                    defaultValue={getInitialDate(articleProps.createdDate)}
                    name={ARTICLE_FORM_FIELDS.createdDate.name}
                    id="new-publication-date"
                    placeholder={getInitialDate(articleProps.createdDate)}
                  />
                </div>
              </div>
            </div>
            <Stack tokens={{childrenGap: 16}} horizontal>
              <PrimaryButton type="submit">Опубликовать</PrimaryButton>
              <IconButton
                href={ClientRoutes.INDEX}
                iconProps={closeButton}
                title="Закрыть окно"
                ariaLabel="Закрыть окно"
              />
            </Stack>
          </div>
          <div className="new-publication__form form">
            <div className="form__wrapper form__wrapper--intro">
              {validationMessages.length ? (
                <FormValidationBlock title="При сохранении статьи произошли ошибки:" messages={validationMessages} />
              ) : null}
              <div className="form__field">
                <TextField
                  label={ARTICLE_FORM_FIELDS.title.label}
                  name={ARTICLE_FORM_FIELDS.title.name}
                  defaultValue={articleProps.title}
                  errorMessage={articleValidationResponse[ARTICLE_FORM_FIELDS.title.name]}
                  required
                />
                <ValidationMessage message={articleValidationResponse[ARTICLE_FORM_FIELDS.title.name]} />
              </div>

              <div className="form__field">
                <div className="field-label ms-fontSize-14 ms-fontWeight-semibold">
                  {ARTICLE_FORM_FIELDS.Upload.label}
                </div>
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
              <div className="form__field">
                <div className="field-label ms-fontSize-14 ms-fontWeight-semibold">
                  {ARTICLE_FORM_FIELDS.categories.label}
                </div>
                <CategoriesSelect
                  availableCategories={availableCategories}
                  selectedCategories={articleProps.categories}
                  inputName={ARTICLE_FORM_FIELDS.categories.name}
                />
              </div>
            </div>
            <div className="form__wrapper form__wrapper--text">
              <div className="form__field form__field--publication-text">
                <TextField
                  multiline
                  rows={5}
                  label={ARTICLE_FORM_FIELDS.announce.label}
                  name={ARTICLE_FORM_FIELDS.announce.name}
                  value={articleProps.announce}
                  errorMessage={articleValidationResponse[ARTICLE_FORM_FIELDS.announce.name]}
                  onChange={() => {}}
                  required
                />
                <ValidationMessage message={articleValidationResponse[ARTICLE_FORM_FIELDS.announce.name]} />
              </div>
              <div className="form__field form__field--publication-text">
                <TextField
                  multiline
                  name={ARTICLE_FORM_FIELDS.fullText.name}
                  rows={10}
                  label={ARTICLE_FORM_FIELDS.fullText.label}
                  value={articleProps.fullText}
                  errorMessage={articleValidationResponse[ARTICLE_FORM_FIELDS.fullText.name]}
                  onChange={() => {}}
                  required
                />
                <ValidationMessage message={articleValidationResponse[ARTICLE_FORM_FIELDS.fullText.name]} />
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
  return Object.entries(validationResponse).map(([key, value]: [keyof typeof ARTICLE_FORM_FIELDS, string]) => [
    ARTICLE_FORM_FIELDS[key]?.label,
    value,
  ]);
}
