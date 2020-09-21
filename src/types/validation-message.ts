import {ValidationError} from "../service/errors/validation-error";

export interface ValidationMessage {
  state: ValidationError;
  message?: string;
}
