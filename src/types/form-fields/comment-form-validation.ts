type CommentFormFieldName = `TEXT`;

type CommentFormValidation = Partial<Record<CommentFormFieldName, string>>;

export {
  CommentFormFieldName,
  CommentFormValidation,
};
