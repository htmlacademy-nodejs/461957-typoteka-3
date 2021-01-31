import Joi from "joi";
import {ROLE_ID} from "../../../../constants-es6";
import {IUserCreatingDoublePasswords} from "../../../../types/interfaces/user-creating";

const PASSWORD_MIN_LENGTH = 6;

export const newUserSchema = Joi.object<IUserCreatingDoublePasswords>({
  email: Joi.string().required().email().messages({
    "any.required": `Обязательное поле`,
    "string.empty": `Поле не может быть пустым`,
    "string.email": `Некорректный email`,
  }),
  firstName: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
    }),
  lastName: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
    }),
  password: Joi.string()
    .required()
    .min(PASSWORD_MIN_LENGTH)
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.min": `Минимальная длина ${PASSWORD_MIN_LENGTH} символов`,
    }),
  passwordRepeated: Joi.string().required().valid(Joi.ref(`password`)).messages({
    "any.only": `Пароли должны совпадать`,
    "any.required": `Обязательное поле`,
    "string.empty": `Поле не может быть пустым`,
  }),
  avatar: Joi.string().required().allow(null, ``),
  roleId: Joi.valid(...Object.values(ROLE_ID)).required(),
});
