import Joi from "joi";

import {NewArticle} from "../../../../types/article";

import {categoryIdsSchema} from "./category";

const TITLE_RESTRICTIONS = [30, 250];
const ANNOUNCE_RESTRICTIONS = [30, 250];
const MAX_FULLTEXT_LENGTH = 1000;

const newArticleSchema = Joi.object<NewArticle>({
  fullText: Joi.string()
    .max(MAX_FULLTEXT_LENGTH)
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.max": `Максимальная длина ${MAX_FULLTEXT_LENGTH} символов`,
    }),
  announce: Joi.string()
    .min(ANNOUNCE_RESTRICTIONS[0])
    .max(ANNOUNCE_RESTRICTIONS[1])
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.min": `Минимальная длина ${ANNOUNCE_RESTRICTIONS[0]} символов`,
      "string.max": `Максимальная длина ${ANNOUNCE_RESTRICTIONS[1]} символов`,
    }),
  title: Joi.string()
    .min(TITLE_RESTRICTIONS[0])
    .max(TITLE_RESTRICTIONS[1])
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.empty": `Поле не может быть пустым`,
      "string.min": `Минимальная длина ${TITLE_RESTRICTIONS[0]} символов`,
      "string.max": `Максимальная длина ${TITLE_RESTRICTIONS[1]} символов`,
    }),
  createdDate: Joi.date().required().messages({
    "any.required": `Обязательное поле`,
  }),
  categories: Joi.array().items(categoryIdsSchema).min(1).required().messages({
    "array.min": `Выберите минимум одну категорию`,
  }),
  authorId: Joi.number().required().messages({
    "any.required": `Обязательное поле`,
  }),
});

export {
  newArticleSchema,
};
