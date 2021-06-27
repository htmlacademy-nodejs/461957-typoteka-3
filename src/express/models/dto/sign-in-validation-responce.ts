import {SignInFormValidation} from "../../../types/form-fields/sign-in-form-validation";
import {SignInValidationResponse} from "../../../types/sign-in-validation-response";

export function signInValidationResponseMapper(
  signInValidationResponse: SignInValidationResponse,
): SignInFormValidation {
  return Object.fromEntries(
    Object.entries({
      EMAIL: signInValidationResponse.email,
      PASSWORD: signInValidationResponse.password,
    }).filter(([, value]) => !!value),
  );
}
