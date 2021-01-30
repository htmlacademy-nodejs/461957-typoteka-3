import {newUserSchema} from "./schemas";
import {ValidationError} from "joi";
import {getValidationDictionary} from "./get-validation-dictionary";
import {IUserCreating} from "../../../types/interfaces/user-creating";

export async function validateNewUser(newUser: IUserCreating): Promise<IUserCreating> {
  try {
    return (await newUserSchema.validateAsync(newUser, {abortEarly: false})) as IUserCreating;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw getValidationDictionary<IUserCreating>(e.details);
    }
    throw e;
  }
}
