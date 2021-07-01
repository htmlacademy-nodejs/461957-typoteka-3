import {ArticleValidationResponse} from "../../../types/article-validation-response";
import {ArticleFormValidation} from "../../../types/form-fields/article-form-validation";

function articleValidationResponseMapper(
  articleValidationResponse: ArticleValidationResponse,
): ArticleFormValidation {
  return Object.fromEntries(
    Object.entries({
      CREATED_DATE: articleValidationResponse.createdDate,
      CATEGORIES: articleValidationResponse.categories,
      TITLE: articleValidationResponse.title,
      ANNOUNCE: articleValidationResponse.announce,
      FULL_TEXT: articleValidationResponse.fullText,
    }).filter(([, value]) => !!value),
  );
}

export {
  articleValidationResponseMapper,
};
