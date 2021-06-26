import {PrimaryButton, Stack, TextField} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {NEW_USER_FORM_FIELDS} from "../../../constants-es6";
import {UserCreatingFromForm} from "../../../types/interfaces/user-creating";
import {UserValidationResponse} from "../../../types/user-validation-response";
import {CsrfHiddenInput} from "../components/CsrfHiddenInput/CsrfHiddenInput";
import {FormValidationBlock} from "../components/Form/FormValidationBlock";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {RegistrationWrapper} from "../components/RegistrationWrapper/RegistrationWrapper";
import {ValidationMessage} from "../components/ValidationMessage/ValidationMessage";
import {ICsrfInput} from "../interfaces/csrf-input";

interface Props extends ICsrfInput {
  user?: Partial<UserCreatingFromForm>;
  endPoint: string;
  userValidationResponse: UserValidationResponse;
}

export const RegistrationPage: FunctionComponent<Props> = ({endPoint, userValidationResponse = {}, user, csrf}) => {
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
                label={NEW_USER_FORM_FIELDS.email.label}
                name={NEW_USER_FORM_FIELDS.email.name}
                defaultValue={userFields.email}
                required
              />
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.email.name]} />
              <TextField
                label={NEW_USER_FORM_FIELDS.firstName.label}
                name={NEW_USER_FORM_FIELDS.firstName.name}
                defaultValue={userFields.firstName}
                required
              />
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.firstName.name]} />
              <TextField
                label={NEW_USER_FORM_FIELDS.lastName.label}
                name={NEW_USER_FORM_FIELDS.lastName.name}
                defaultValue={userFields.lastName}
                required
              />
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.lastName.name]} />
              <TextField
                type="password"
                label={NEW_USER_FORM_FIELDS.password.label}
                name={NEW_USER_FORM_FIELDS.password.name}
                defaultValue={userFields.password}
                required
                autoComplete="new-password"
              />
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.password.name]} />
              <TextField
                type="password"
                label={NEW_USER_FORM_FIELDS.passwordRepeated.label}
                name={NEW_USER_FORM_FIELDS.passwordRepeated.name}
                defaultValue={userFields.passwordRepeated}
                required
              />
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.passwordRepeated.name]} />
            </Stack>
            <Stack.Item>
              <div className="form__image-loader">
                <a className="form__avatar avatar">
                  <img src="img/icons/smile.svg" alt={NEW_USER_FORM_FIELDS.avatar.label} />
                </a>
                <label>
                  <input
                    type="file"
                    name={NEW_USER_FORM_FIELDS.avatar.name}
                    defaultValue={userFields.avatar}
                    className="visually-hidden"
                  />
                  Загрузить фото профиля
                </label>
              </div>
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.avatar.name]} />
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
  return Object.entries(validationResponse).map(([key, value]: [keyof typeof NEW_USER_FORM_FIELDS, string]) => [
    NEW_USER_FORM_FIELDS[key]?.label,
    value,
  ]);
}
