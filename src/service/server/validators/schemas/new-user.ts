import Joi from "joi";
import {ROLE_ID} from "../../../../constants-es6";
import {IUserCreating} from "../../../../types/interfaces/user-creating";

export const newUserSchema = Joi.object<IUserCreating>({
  email: Joi.string().required().email().messages({
    "any.required": `Обязательное поле`,
    "string.empty": `Поле не может быть пустым`,
    "string.email": `Пожалуйста, введите другой email`,
  }),
  firstName: Joi.string()
    .regex(/^[A-Z]+$/)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
    }),
  lastName: Joi.string()
    .regex(/^[A-Z]+$/)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
    }),
  avatar: Joi.string(),
  roleId: Joi.valid(...Object.values(ROLE_ID.ADMIN)).required(),
});
