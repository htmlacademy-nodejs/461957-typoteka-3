import Joi from "joi";
import {ROLE_ID} from "../../../../constants-es6";
import {IUserCreating} from "../../../../types/interfaces/user-creating";

export const newUserSchema = Joi.object<IUserCreating>({
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
  avatar: Joi.string().required().allow(null, ``),
  roleId: Joi.valid(...Object.values(ROLE_ID)).required(),
});
