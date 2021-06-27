export type ArticleFormFieldName =
  | `CREATED_DATE`
  | `CATEGORIES`
  | `TITLE`
  | `ANNOUNCE`
  | `FULL_TEXT`
  | `IMAGE`
  | `UPLOAD`;

export type ArticleFormValidation = Partial<Record<ArticleFormFieldName, string>>;
