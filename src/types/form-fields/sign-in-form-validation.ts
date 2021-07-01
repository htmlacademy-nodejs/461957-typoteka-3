type SignInFormFieldName = `EMAIL` | `PASSWORD`;

type SignInFormValidation = Partial<Record<SignInFormFieldName, string>>;

export {
  SignInFormFieldName,
  SignInFormValidation,
};
