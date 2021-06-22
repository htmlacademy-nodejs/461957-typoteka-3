import {IAuthTokens} from "./auth-tokens";
import {SignInValidationResponse} from "../sign-in-validation-response";

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
