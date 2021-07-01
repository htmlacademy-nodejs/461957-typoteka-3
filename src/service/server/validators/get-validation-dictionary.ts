import {ValidationErrorItem} from "joi";

import {ValidationResponse} from "../../../types/validation-response";

function getValidationDictionary<T>(errors: ValidationErrorItem[]): ValidationResponse<T> {
  const collection = errors.map(item => ({[item.context.key]: item.message}));
  return Object.assign({}, ...collection) as Partial<Record<keyof T, string>>;
}

export {
  getValidationDictionary,
};
