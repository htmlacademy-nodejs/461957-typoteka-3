import {SignInValidationResponse} from "../sign-in-validation-response";

import type {IAuthTokens} from "./auth-tokens";

export interface IAuthorizationResult {
  isSuccess: boolean;
}

export interface IAuthorizationSuccess extends IAuthorizationResult {
  isSuccess: true;
  payload: IAuthTokens;
}

export interface IAuthorizationFailed extends IAuthorizationResult {
  isSuccess: false;
  payload: SignInValidationResponse;
}
