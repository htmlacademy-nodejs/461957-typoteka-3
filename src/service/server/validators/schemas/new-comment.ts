import Joi from "joi";

import {ICommentCreating} from "../../../../types/interfaces/comment-creating";

const COMMENT_TEXT_MIN_LENGTH = 20;
const COMMENT_TEXT_MAX_LENGTH = 255;

const newCommentSchema = Joi.object<ICommentCreating>({
  text: Joi.string()
    .min(COMMENT_TEXT_MIN_LENGTH)
    .max(COMMENT_TEXT_MAX_LENGTH)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.min": `Минимальная длина ${COMMENT_TEXT_MIN_LENGTH} символов`,
      "string.max": `Максимальная длина ${COMMENT_TEXT_MAX_LENGTH} символов`,
    }),
  articleId: Joi.number().positive().integer().required().messages({
    "any.required": `Обязательное поле`,
  }),
  createdDate: Joi.date().required(),
  authorId: Joi.number().required().messages({
    "any.required": `Обязательное поле`,
  }),
});

export {newCommentSchema};
