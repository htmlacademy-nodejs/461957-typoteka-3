import {newUserSchema} from "./schemas";
import {ValidationError} from "joi";
import {getValidationDictionary} from "./get-validation-dictionary";
import {IUserCreatingDoublePasswords} from "../../../types/interfaces/user-creating";
import {getLogger} from "../../logger";

export async function validateNewUser(newUser: IUserCreatingDoublePasswords): Promise<IUserCreatingDoublePasswords> {
  const logger = getLogger();
  try {
    return (await newUserSchema.validateAsync(newUser, {abortEarly: false})) as IUserCreatingDoublePasswords;
  } catch (e) {
    if (e instanceof ValidationError) {
      logger.debug(`Failed to validate the new user`);
      throw getValidationDictionary<IUserCreatingDoublePasswords>(e.details);
    }
    logger.debug(`Unknown error during validating the new user`);
    throw e;
  }
}
