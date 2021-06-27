import {PrimaryButton, Stack, TextField} from "@fluentui/react";
import React, {FunctionComponent} from "react";

import {NewUserFormField} from "../../../shared/constants/forms/new-user-form-field";
import {SingInFormField} from "../../../shared/constants/forms/sing-in-form-field";
import {ILogin} from "../../../types/interfaces/login";
import {SignInValidationResponse} from "../../../types/sign-in-validation-response";
import {CsrfHiddenInput} from "../components/CsrfHiddenInput/CsrfHiddenInput";
import {FormValidationBlock} from "../components/Form/FormValidationBlock";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {SignInWrapper} from "../components/SignInWrapper/SignInWrapper";
import {ValidationMessage} from "../components/ValidationMessage/ValidationMessage";
import {ICsrfInput} from "../interfaces/csrf-input";

interface Props extends ICsrfInput {
  endPoint: string;
  signInValidationResponse: Partial<SignInValidationResponse>;
  signIn?: Omit<ILogin, "password">;
}

export const SignInPage: FunctionComponent<Props> = ({endPoint, signInValidationResponse = {}, signIn, csrf}) => {
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
                <ValidationMessage message={signInValidationResponse[SingInFormField.EMAIL.name]} />
              </div>
              <div className="form__field">
                <TextField
                  type="password"
                  label={SingInFormField.PASSWORD.label}
                  name={SingInFormField.PASSWORD.name}
                  required
                />
                <ValidationMessage message={signInValidationResponse[SingInFormField.PASSWORD.name]} />
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
