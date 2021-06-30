import {SignInValidationResponse} from "../sign-in-validation-response";

import type {IAuthTokens} from "./auth-tokens";

interface IAuthorizationResult {
  isSuccess: boolean;
}

interface IAuthorizationSuccess extends IAuthorizationResult {
  isSuccess: true;
  payload: IAuthTokens;
}

interface IAuthorizationFailed extends IAuthorizationResult {
  isSuccess: false;
  payload: SignInValidationResponse;
}

export {
  IAuthorizationFailed,
  IAuthorizationResult,
  IAuthorizationSuccess,
};
