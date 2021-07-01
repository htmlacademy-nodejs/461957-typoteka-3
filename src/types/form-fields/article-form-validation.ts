type ArticleFormFieldName =
  | `CREATED_DATE`
  | `CATEGORIES`
  | `TITLE`
  | `ANNOUNCE`
  | `FULL_TEXT`
  | `IMAGE`
  | `UPLOAD`;

type ArticleFormValidation = Partial<Record<ArticleFormFieldName, string>>;

export {
  ArticleFormFieldName,
  ArticleFormValidation,
};
