import {RegistrationFormValidation} from "../../../types/form-fields/registration-form-validation";
import {UserValidationResponse} from "../../../types/user-validation-response";

function registrationValidationResponseMapper(
  userValidationResponse: UserValidationResponse,
): RegistrationFormValidation {
  return Object.fromEntries(
    Object.entries({
      FIRST_NAME: userValidationResponse.firstName,
      LAST_NAME: userValidationResponse.lastName,
      AVATAR: userValidationResponse.avatar,
      EMAIL: userValidationResponse.email,
      PASSWORD: userValidationResponse.password,
      PASSWORD_REPEATED: userValidationResponse.passwordRepeated,
    }).filter(([, value]) => !!value),
  );
}

export {
  registrationValidationResponseMapper,
};
