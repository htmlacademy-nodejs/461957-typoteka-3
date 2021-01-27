import Joi from "joi";
import {newArticleSchema} from "./new-article";

export const articleSchema = newArticleSchema.append({
  id: Joi.number().required().messages({
    "any.required": `Обязательное поле`,
  }),
});
