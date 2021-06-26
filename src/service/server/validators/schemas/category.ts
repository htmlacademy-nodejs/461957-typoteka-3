import Joi from "joi";

import {Category} from "../../../../types/category";

const CATEGORY_NAME_RESTRICTIONS = [5, 30];

export const categoryIdsSchema = Joi.object<Category>({
  id: Joi.number().required().messages({
    "any.required": `Обязательное поле`,
  }),
});

export const categorySchema = categoryIdsSchema.append({
  label: Joi.string()
    .min(CATEGORY_NAME_RESTRICTIONS[0])
    .max(CATEGORY_NAME_RESTRICTIONS[1])
    .required()
    .messages({
      "any.required": `Обязательное поле`,
      "string.min": `Минимальная длина ${CATEGORY_NAME_RESTRICTIONS[0]} символов`,
      "string.max": `Максимальная длина ${CATEGORY_NAME_RESTRICTIONS[1]} символов`,
    }),
});
