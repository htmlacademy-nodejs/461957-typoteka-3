import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {SignInWrapper} from "../components/SignInWrapper/SignInWrapper";
import {NEW_USER_FORM_FIELDS} from "../../../constants-es6";
import {ValidationMessage} from "../components/ValidationMessage/ValidationMessage";
import {SING_IN_FORM_FIELDS} from "../../../shared/constants/forms/sing-in-form-fields";
import {SignInValidationResponse} from "../../../types/sign-in-validation-response";
import {ILogin} from "../../../types/interfaces/login";
import {FormValidationBlock} from "../components/Form/FormValidationBlock";
import {FormValidationMessage} from "../components/Form/FormValidationMessage";
import {CsrfHiddenInput} from "../components/CsrfHiddenInput/CsrfHiddenInput";
import {ICsrfInput} from "../interfaces/csrf-input";
import {PrimaryButton, Stack, TextField} from "@fluentui/react";

interface Props extends ICsrfInput {
  endPoint: string;
  signInValidationResponse?: Partial<SignInValidationResponse>;
  signIn?: Omit<ILogin, "password">;
}

export const SignInPage: FunctionComponent<Props> = ({endPoint, signInValidationResponse = {}, signIn, csrf}) => {
  const signInFields = {email: signIn?.email ?? ``};
  return (
    <LayoutFilled pageTitle={`Вход`} currentUser={null}>
      <SignInWrapper>
        <form action={endPoint} method="POST" encType="multipart/form-data">
          <Stack tokens={{childrenGap: 32}}>
            <Stack tokens={{childrenGap: 16}}>
              {Object.keys(signInValidationResponse).length ? (
                <FormValidationBlock title={"При входе произошли ошибки:"}>
                  {Object.entries(signInValidationResponse).map(([key, validation]) => (
                    <li key={key}>
                      <FormValidationMessage>
                        <strong>{NEW_USER_FORM_FIELDS[key]?.label}:</strong> {validation}
                      </FormValidationMessage>
                    </li>
                  ))}
                </FormValidationBlock>
              ) : null}
              <div className="form__field">
                <TextField
                  type="email"
                  label={SING_IN_FORM_FIELDS.email.label}
                  name={SING_IN_FORM_FIELDS.email.name}
                  defaultValue={signInFields.email}
                  required={true}
                />
                <ValidationMessage message={signInValidationResponse[SING_IN_FORM_FIELDS.email.name]} />
              </div>
              <div className="form__field">
                <TextField
                  type="password"
                  label={SING_IN_FORM_FIELDS.password.label}
                  name={SING_IN_FORM_FIELDS.password.name}
                  required={true}
                />
                <ValidationMessage message={signInValidationResponse[SING_IN_FORM_FIELDS.password.name]} />
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
