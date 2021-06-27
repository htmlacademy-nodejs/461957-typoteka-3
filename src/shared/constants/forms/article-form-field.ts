import {ArticleFormFieldName} from "../../../types/form-fields/article-form-validation";
import {IFormField} from "../../../types/interfaces/form-field";

export const ArticleFormField: Record<ArticleFormFieldName, IFormField> = {
  CREATED_DATE: {
    name: `createdDate`,
    label: `Дата`,
  },
  CATEGORIES: {
    name: `categories`,
    label: `Категории`,
  },
  TITLE: {
    name: `title`,
    label: `Заголовок`,
  },
  ANNOUNCE: {
    name: `announce`,
    label: `Анонс публикации`,
  },
  FULL_TEXT: {
    name: `fullText`,
    label: `Полный текст публикации`,
  },
  IMAGE: {
    name: `image`,
    label: `Фотография`,
  },
  UPLOAD: {
    name: `upload`,
    label: `Фотография`,
  },
} as const;
