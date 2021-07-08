import {PrimaryButton, Stack, TextField} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {NewUserFormField} from "../../../shared/constants/forms/new-user-form-field";
import {SingInFormField} from "../../../shared/constants/forms/sing-in-form-field";
import {SignInFormValidation} from "../../../types/form-fields/sign-in-form-validation";
import {ILogin} from "../../../types/interfaces/login";
import {CsrfHiddenInput} from "../components/csrf-hidden-input/csrf-hidden-input";
import {FormValidationBlock} from "../components/form/form-validation-block";
import {LayoutFilled} from "../components/layout/layout-filled";
import {SignInWrapper} from "../components/sign-in-wrapper/sign-in-wrapper";
import {ValidationMessage} from "../components/validation-message/validation-message";
import {ICsrfInput} from "../interfaces/csrf-input";

interface Props extends ICsrfInput {
  endPoint: string;
  signInValidationResponse: SignInFormValidation;
  signIn?: Omit<ILogin, "password">;
}

const SignInPage: FunctionComponent<Props> = ({endPoint, signInValidationResponse = {}, signIn, csrf}) => {
  const signInFields = {email: signIn?.email ?? ``};
  const validationMessages = resolveValidationMessages(signInValidationResponse);
  return (
    <LayoutFilled pageTitle={`Вход`} currentUser={null}>
      <SignInWrapper>
        <form action={endPoint} method="POST" encType="multipart/form-data">
          <Stack tokens={{childrenGap: 32}}>
            <Stack tokens={{childrenGap: 16}}>
              {validationMessages.length ? (
                <FormValidationBlock title="При входе произошли ошибки:" messages={validationMessages} />
              ) : null}
              <div className="form__field">
                <TextField
                  type="email"
                  label={SingInFormField.EMAIL.label}
                  name={SingInFormField.EMAIL.name}
                  defaultValue={signInFields.email}
                  required
                />
                <ValidationMessage message={signInValidationResponse.EMAIL} />
              </div>
              <div className="form__field">
                <TextField
                  type="password"
                  label={SingInFormField.PASSWORD.label}
                  name={SingInFormField.PASSWORD.name}
                  required
                />
                <ValidationMessage message={signInValidationResponse.PASSWORD} />
              </div>
            </Stack>
            <Stack.Item align="end">
              <PrimaryButton type="submit">Войти</PrimaryButton>
            </Stack.Item>
          </Stack>
          <CsrfHiddenInput csrf={csrf} />
        </form>
      </SignInWrapper>
    </LayoutFilled>
  );
};

function resolveValidationMessages(validationResponse: Record<string, string>): [string, string][] {
  return Object.entries(validationResponse).map(([key, value]: [keyof typeof NewUserFormField, string]) => [
    NewUserFormField[key]?.label,
    value,
  ]);
}

export {SignInPage};
