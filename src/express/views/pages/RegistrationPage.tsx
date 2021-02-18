import React, {FunctionComponent} from "react";
import {LayoutFilled} from "../components/Layout/LayoutFilled";
import {UserValidationResponse} from "../../../types/user-validation-response";
import {RegistrationWrapper} from "../components/RegistrationWrapper/RegistrationWrapper";
import {UserCreatingFromForm} from "../../../types/interfaces/user-creating";
import {FormValidationBlock} from "../components/Form/FormValidationBlock";
import {FormValidationMessage} from "../components/Form/FormValidationMessage";
import {NEW_USER_FORM_FIELDS} from "../../../constants-es6";
import {ValidationMessage} from "../components/ValidationMessage/ValidationMessage";

interface Props {
  user?: Partial<UserCreatingFromForm>;
  endPoint: string;
  userValidationResponse?: UserValidationResponse;
}

export const RegistrationPage: FunctionComponent<Props> = ({endPoint, userValidationResponse, user}) => {
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
  return (
    <LayoutFilled pageTitle={`Регистрация`}>
      <RegistrationWrapper>
        <h2 className="popup__title">Регистрация</h2>
        <div className="popup__form popup__form--active form form--register">
          {Object.keys(userValidationResponse).length ? (
            <FormValidationBlock title={"При регистрации произошли ошибки:"}>
              {Object.entries(userValidationResponse).map(([key, validation]) => (
                <FormValidationMessage key={key}>
                  <strong>{NEW_USER_FORM_FIELDS[key]?.label}:</strong> {validation}
                </FormValidationMessage>
              ))}
            </FormValidationBlock>
          ) : null}

          <form action={endPoint} method="POST" encType="multipart/form-data">
            <div className="form__field">
              <label>
                <input
                  type="email"
                  name={NEW_USER_FORM_FIELDS.email.name}
                  defaultValue={userFields.email}
                  placeholder={NEW_USER_FORM_FIELDS.email.label}
                  required
                />
              </label>
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.email.name]} />
            </div>
            <div className="form__field">
              <label>
                <input
                  type="text"
                  name={NEW_USER_FORM_FIELDS.firstName.name}
                  defaultValue={userFields.firstName}
                  placeholder={NEW_USER_FORM_FIELDS.firstName.label}
                  required
                />
              </label>
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.firstName.name]} />
            </div>
            <div className="form__field">
              <label>
                <input
                  type="text"
                  name={NEW_USER_FORM_FIELDS.lastName.name}
                  defaultValue={userFields.lastName}
                  placeholder={NEW_USER_FORM_FIELDS.lastName.label}
                />
              </label>
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.lastName.name]} />
            </div>
            <div className="form__field">
              <label>
                <input
                  type="password"
                  name={NEW_USER_FORM_FIELDS.password.name}
                  defaultValue={userFields.password}
                  placeholder={NEW_USER_FORM_FIELDS.password.label}
                  required
                />
              </label>
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.password.name]} />
            </div>
            <div className="form__field">
              <label>
                <input
                  type="password"
                  name={NEW_USER_FORM_FIELDS.passwordRepeated.name}
                  defaultValue={userFields.passwordRepeated}
                  placeholder={NEW_USER_FORM_FIELDS.passwordRepeated.label}
                  required
                />
              </label>
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.passwordRepeated.name]} />
            </div>
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
              <ValidationMessage message={userValidationResponse[NEW_USER_FORM_FIELDS.avatar.name]} />
            </div>
            <button className="form__submit-btn form__submit-btn--register button button--colored" type="submit">
              Зарегистрироваться
            </button>
          </form>
        </div>
      </RegistrationWrapper>
    </LayoutFilled>
  );
};
