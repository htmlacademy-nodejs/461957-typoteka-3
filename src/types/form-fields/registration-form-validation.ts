export type RegistrationFormFieldName =
  | `EMAIL`
  | `PASSWORD`
  | `PASSWORD_REPEATED`
  | `FIRST_NAME`
  | `LAST_NAME`
  | `AVATAR`;

export type RegistrationFormValidation = Partial<Record<RegistrationFormFieldName, string>>;
