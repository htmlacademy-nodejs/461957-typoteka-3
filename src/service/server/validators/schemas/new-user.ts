import Joi from "joi";

import {NewUserFormField} from "../../../../shared/constants/forms/new-user-form-field";
import {RoleId} from "../../../../shared/constants/role-id";
import {IUserCreatingDoublePasswords} from "../../../../types/interfaces/user-creating";

const PASSWORD_MIN_LENGTH = 6;

export const newUserSchema = Joi.object<IUserCreatingDoublePasswords>({
  [NewUserFormField.EMAIL.name]: Joi.string().required().email().messages({
    "any.required": `Обязательное поле`,
    "string.empty": `Поле не может быть пустым`,
    "string.email": `Некорректный email`,
  }),
  [NewUserFormField.FIRST_NAME.name]: Joi.string()
    .regex(/^[A-Za-zА-Яа-яЁё\s]*$/)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.pattern.base": `Запишите имя на латинице или кириллице`,
    }),
  [NewUserFormField.LAST_NAME.name]: Joi.string()
    .regex(/^[A-Za-zА-Яа-яЁё\s]*$/)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.pattern.base": `Запишите фамилию на латинице или кириллице`,
    }),
  [NewUserFormField.PASSWORD.name]: Joi.string()
    .required()
    .min(PASSWORD_MIN_LENGTH)
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.min": `Минимальная длина ${PASSWORD_MIN_LENGTH} символов`,
    }),
  [NewUserFormField.PASSWORD_REPEATED.name]: Joi.string().required().valid(Joi.ref(`password`)).messages({
    "any.only": `Пароли должны совпадать`,
    "any.required": `Обязательное поле`,
    "string.empty": `Поле не может быть пустым`,
  }),
  [NewUserFormField.AVATAR.name]: Joi.string().allow(null, ``).messages({
    "any.required": `Загрузите фото профиля`,
  }),
  roleId: Joi.valid(...Object.values(RoleId)).required(),
});
