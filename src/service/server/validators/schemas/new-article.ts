import Joi from "joi";
import {Article} from "../../../../types/article";
import {categoryIdsSchema} from "./category";

const TITLE_RESTRICTIONS = [30, 250];
const ANNOUNCE_RESTRICTIONS = [30, 250];
const MAX_FULLTEXT_LENGTH = 1000;

export const newArticleSchema = Joi.object<Article>({
  fullText: Joi.string()
    .max(MAX_FULLTEXT_LENGTH)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.max": `Максимальная длина ${MAX_FULLTEXT_LENGTH} символов`,
      "string.empty": `Поле не может быть пустым`,
    }),
  announce: Joi.string()
    .min(ANNOUNCE_RESTRICTIONS[0])
    .max(ANNOUNCE_RESTRICTIONS[1])
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.min": `Минимальная длина ${ANNOUNCE_RESTRICTIONS[0]} символов`,
      "string.max": `Максимальная длина ${ANNOUNCE_RESTRICTIONS[1]} символов`,
    }),
  title: Joi.string()
    .min(TITLE_RESTRICTIONS[0])
    .max(TITLE_RESTRICTIONS[1])
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.min": `Минимальная длина ${TITLE_RESTRICTIONS[0]} символов`,
      "string.max": `Максимальная длина ${TITLE_RESTRICTIONS[1]} символов`,
    }),
  createdDate: Joi.date().required().messages({
    "any.required": `Обязательное поле`,
  }),
  categories: Joi.array().items(categoryIdsSchema).min(1).required().messages({
    "array.min": `Выберите минимум одну категорию`,
  }),
});
