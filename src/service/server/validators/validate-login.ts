import {loginSchema} from "./schemas";
import {ValidationError} from "joi";
import {getValidationDictionary} from "./get-validation-dictionary";
import {ILogin} from "../../../types/interfaces/login";
import {getLogger} from "../../logger";

export async function validateLogin(login: ILogin): Promise<ILogin> {
  const logger = getLogger();
  try {
    return (await loginSchema.validateAsync(login, {abortEarly: false})) as ILogin;
  } catch (e) {
    if (e instanceof ValidationError) {
      logger.debug(`Failed to validate sign-in form`);
      throw getValidationDictionary<ILogin>(e.details);
    }
    logger.debug(`Unknown error during validating the sign-in form`);
    throw e;
  }
}
