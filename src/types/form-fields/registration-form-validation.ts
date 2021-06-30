type RegistrationFormFieldName =
  | `EMAIL`
  | `PASSWORD`
  | `PASSWORD_REPEATED`
  | `FIRST_NAME`
  | `LAST_NAME`
  | `AVATAR`;

type RegistrationFormValidation = Partial<Record<RegistrationFormFieldName, string>>;

export {
  RegistrationFormFieldName,
  RegistrationFormValidation,
};
