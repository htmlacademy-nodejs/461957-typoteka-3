import {PrimaryButton, Stack, TextField} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {NewUserFormField} from "../../../shared/constants/forms/new-user-form-field";
import {RegistrationFormValidation} from "../../../types/form-fields/registration-form-validation";
import {UserCreatingFromForm} from "../../../types/interfaces/user-creating";
import {CsrfHiddenInput} from "../components/CsrfHiddenInput/CsrfHiddenInput";
import {FormValidationBlock} from "../components/Form/FormValidationBlock";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {RegistrationWrapper} from "../components/RegistrationWrapper/RegistrationWrapper";
import {ValidationMessage} from "../components/ValidationMessage/ValidationMessage";
import {ICsrfInput} from "../interfaces/csrf-input";

interface Props extends ICsrfInput {
  user?: Partial<UserCreatingFromForm>;
  endPoint: string;
  userValidationResponse: RegistrationFormValidation;
}

const RegistrationPage: FunctionComponent<Props> = ({endPoint, userValidationResponse = {}, user, csrf}) => {
  const userFields =
    user === undefined
      ? {
          email: ``,
          avatar: ``,
          firstName: ``,
          lastName: ``,
          password: ``,
          passwordRepeated: ``,
        }
      : {
          email: user.email,
          avatar: user.avatar,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          passwordRepeated: user.passwordRepeated,
        };
  const validationMessages = resolveValidationMessages(userValidationResponse);
  return (
    <LayoutFilled pageTitle={`Регистрация`} currentUser={null}>
      <RegistrationWrapper>
        {validationMessages.length ? (
          <FormValidationBlock title={"При регистрации произошли ошибки:"} messages={validationMessages} />
        ) : null}

        <form action={endPoint} method="POST" encType="multipart/form-data">
          <Stack tokens={{childrenGap: 32}}>
            <Stack tokens={{childrenGap: 16}}>
              <TextField
                type="email"
                label={NewUserFormField.EMAIL.label}
                name={NewUserFormField.EMAIL.name}
                defaultValue={userFields.email}
                required
              />
              <ValidationMessage message={userValidationResponse.EMAIL} />
              <TextField
                label={NewUserFormField.FIRST_NAME.label}
                name={NewUserFormField.FIRST_NAME.name}
                defaultValue={userFields.firstName}
                required
              />
              <ValidationMessage message={userValidationResponse.FIRST_NAME} />
              <TextField
                label={NewUserFormField.LAST_NAME.label}
                name={NewUserFormField.LAST_NAME.name}
                defaultValue={userFields.lastName}
                required
              />
              <ValidationMessage message={userValidationResponse.LAST_NAME} />
              <TextField
                type="password"
                label={NewUserFormField.PASSWORD.label}
                name={NewUserFormField.PASSWORD.name}
                defaultValue={userFields.password}
                required
                autoComplete="new-password"
              />
              <ValidationMessage message={userValidationResponse.PASSWORD} />
              <TextField
                type="password"
                label={NewUserFormField.PASSWORD_REPEATED.label}
                name={NewUserFormField.PASSWORD_REPEATED.name}
                defaultValue={userFields.passwordRepeated}
                required
              />
              <ValidationMessage message={userValidationResponse.PASSWORD_REPEATED} />
            </Stack>
            <Stack.Item>
              <div className="form__image-loader">
                <a className="form__avatar avatar">
                  <img src="img/icons/smile.svg" alt={NewUserFormField.AVATAR.label} />
                </a>
                <label>
                  <input
                    type="file"
                    name={NewUserFormField.AVATAR.name}
                    defaultValue={userFields.avatar}
                    className="visually-hidden"
                  />
                  Загрузить фото профиля
                </label>
              </div>
              <ValidationMessage message={userValidationResponse.AVATAR} />
            </Stack.Item>
            <Stack.Item align="end">
              <PrimaryButton type="submit">Зарегистироваться</PrimaryButton>
            </Stack.Item>
          </Stack>
          <CsrfHiddenInput csrf={csrf} />
        </form>
      </RegistrationWrapper>
    </LayoutFilled>
  );
};

function resolveValidationMessages(validationResponse: Record<string, string>): [string, string][] {
  return Object.entries(validationResponse).map(([key, value]: [keyof typeof NewUserFormField, string]) => [
    NewUserFormField[key]?.label,
    value,
  ]);
}

export {
  RegistrationPage,
};
