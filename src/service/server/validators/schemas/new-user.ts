import Joi from "joi";
import {NEW_USER_FORM_FIELDS, ROLE_ID} from "../../../../constants-es6";
import {IUserCreatingDoublePasswords} from "../../../../types/interfaces/user-creating";

const PASSWORD_MIN_LENGTH = 6;

export const newUserSchema = Joi.object<IUserCreatingDoublePasswords>({
  [NEW_USER_FORM_FIELDS.email.name]: Joi.string().required().email().messages({
    "any.required": `Обязательное поле`,
    "string.empty": `Поле не может быть пустым`,
    "string.email": `Некорректный email`,
  }),
  [NEW_USER_FORM_FIELDS.firstName.name]: Joi.string()
    .regex(/^[A-Za-zА-Яа-яЁё\s]*$/)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.pattern.base": `Запишите имя на латинице или кириллице`,
    }),
  [NEW_USER_FORM_FIELDS.lastName.name]: Joi.string()
    .regex(/^[A-Za-zА-Яа-яЁё\s]*$/)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.pattern.base": `Запишите фамилию на латинице или кириллице`,
    }),
  [NEW_USER_FORM_FIELDS.password.name]: Joi.string()
    .required()
    .min(PASSWORD_MIN_LENGTH)
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.min": `Минимальная длина ${PASSWORD_MIN_LENGTH} символов`,
    }),
  [NEW_USER_FORM_FIELDS.passwordRepeated.name]: Joi.string().required().valid(Joi.ref(`password`)).messages({
    "any.only": `Пароли должны совпадать`,
    "any.required": `Обязательное поле`,
    "string.empty": `Поле не может быть пустым`,
  }),
  [NEW_USER_FORM_FIELDS.avatar.name]: Joi.string().allow(null, ``).messages({
    "any.required": `Загрузите фото профиля`,
  }),
  roleId: Joi.valid(...Object.values(ROLE_ID)).required(),
});
