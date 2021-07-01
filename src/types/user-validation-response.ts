import {ValidationResponse} from "./validation-response";
import {IUserCreatingDoublePasswords} from "./interfaces/user-creating";

type UserValidationResponse = ValidationResponse<IUserCreatingDoublePasswords>;

export {
  UserValidationResponse,
};
