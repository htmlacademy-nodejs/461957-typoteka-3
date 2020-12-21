import type {ValidationError} from "../shared/errors/validation-error";

export interface ValidationMessage {
  state: typeof ValidationError[keyof typeof ValidationError];
  message?: string;
}
