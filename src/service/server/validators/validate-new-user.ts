import {newUserSchema} from "./schemas";
import {ValidationError} from "joi";
import {getValidationDictionary} from "./get-validation-dictionary";
import {IUserCreatingDoublePasswords} from "../../../types/interfaces/user-creating";

export async function validateNewUser(newUser: IUserCreatingDoublePasswords): Promise<IUserCreatingDoublePasswords> {
  try {
    return (await newUserSchema.validateAsync(newUser, {abortEarly: false})) as IUserCreatingDoublePasswords;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw getValidationDictionary<IUserCreatingDoublePasswords>(e.details);
    }
    throw e;
  }
}
