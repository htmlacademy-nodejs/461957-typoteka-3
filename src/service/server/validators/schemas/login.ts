import Joi from "joi";
import {IUserCreatingDoublePasswords} from "../../../../types/interfaces/user-creating";

const PASSWORD_MIN_LENGTH = 6;

export const loginSchema = Joi.object<IUserCreatingDoublePasswords>({
  email: Joi.string().required().email().messages({
    "any.required": `Обязательное поле`,
    "string.empty": `Поле не может быть пустым`,
    "string.email": `Некорректный email`,
  }),
  password: Joi.string()
    .required()
    .min(PASSWORD_MIN_LENGTH)
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.min": `Минимальная длина ${PASSWORD_MIN_LENGTH} символов`,
    }),
});
