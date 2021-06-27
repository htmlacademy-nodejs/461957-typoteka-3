export type SignInFormFieldName = `EMAIL` | `PASSWORD`;

export type SignInFormValidation = Partial<Record<SignInFormFieldName, string>>;
