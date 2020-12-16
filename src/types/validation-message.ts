import {ValidationError} from "../shared/errors/validation-error";

export interface ValidationMessage {
  state: ValidationError;
  message?: string;
}
