import {loginSchema} from "./schemas";
import {ValidationError} from "joi";
import {getValidationDictionary} from "./get-validation-dictionary";
import {ILogin} from "../../../types/interfaces/login";

export async function validateLogin(login: ILogin): Promise<ILogin> {
  try {
    return (await loginSchema.validateAsync(login, {abortEarly: false})) as ILogin;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw getValidationDictionary<ILogin>(e.details);
    }
    throw e;
  }
}
