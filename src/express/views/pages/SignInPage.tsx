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

interface Props {
  endPoint: string;
  signInValidationResponse?: Partial<SignInValidationResponse>;
  signIn?: Omit<ILogin, "password">;
}

export const SignInPage: FunctionComponent<Props> = ({endPoint, signInValidationResponse = {}, signIn}) => {
  const signInFields = {email: signIn?.email ?? ``};
  return (
    <LayoutFilled pageTitle={`Вход`}>
      <SignInWrapper>
        <h2 className="popup__title">Войти</h2>
        <div className="popup__form form form--log-in">
          <form action={endPoint} method="POST" encType="multipart/form-data">
            {Object.keys(signInValidationResponse).length ? (
              <FormValidationBlock title={"При входе произошли ошибки:"}>
                {Object.entries(signInValidationResponse).map(([key, validation]) => (
                  <li>
                    <FormValidationMessage key={key}>
                      <strong>{NEW_USER_FORM_FIELDS[key]?.label}:</strong> {validation}
                    </FormValidationMessage>
                  </li>
                ))}
              </FormValidationBlock>
            ) : null}
            <div className="form__field">
              <label>
                <input
                  type="email"
                  name={SING_IN_FORM_FIELDS.email.name}
                  defaultValue={signInFields.email}
                  placeholder={SING_IN_FORM_FIELDS.email.label}
                  required
                />
              </label>
            </div>
            <ValidationMessage message={signInValidationResponse[SING_IN_FORM_FIELDS.email.name]} />
            <div className="form__field">
              <label>
                <input
                  type="password"
                  name={SING_IN_FORM_FIELDS.password.name}
                  placeholder={SING_IN_FORM_FIELDS.password.label}
                  required
                />
              </label>
            </div>
            <ValidationMessage message={signInValidationResponse[SING_IN_FORM_FIELDS.password.name]} />
            <button className="form__submit-btn form__submit-btn--log-in button button--colored" type="submit">
              Войти
            </button>
          </form>
        </div>
      </SignInWrapper>
    </LayoutFilled>
  );
};
