import Joi from "joi";
import {ICommentCreating} from "../../../../types/interfaces/comment-creating";

const COMMENT_TEXT_MIN_LENGTH = 20;

export const newCommentSchema = Joi.object<ICommentCreating>({
  text: Joi.string()
    .min(COMMENT_TEXT_MIN_LENGTH)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.min": `Минимальная длина ${COMMENT_TEXT_MIN_LENGTH} символов`,
    }),
  articleId: Joi.number().positive().integer().required().messages({
    "any.required": `Обязательное поле`,
  }),
  createdDate: Joi.date().required(),
});
