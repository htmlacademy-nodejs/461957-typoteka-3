import {NextFunction, Request, Response} from "express";
import {Article} from "../../types/article";
import {ArticleValidationResponse} from "../../types/article-validation-response";
import {ValidationError} from "../errors/validation-error";
import {HttpCode} from "../../constants-es6";

const TITLE_RESTRICTIONS = [30, 250];
const ANNOUNCE_RESTRICTIONS = [30, 250];
const MAX_FULLTEXT_LENGTH = 1000;

export function newArticleValidator(req: Request, res: Response, next: NextFunction): void {
  const articleValidationResponse = getArticleValidationResponse(req.body, [`id`]);
  if (!articleValidationResponse) {
    next();
  } else {
    res.status(HttpCode.BAD_REQUEST).send(articleValidationResponse);
  }
}

export function existingArticleValidator(req: Request, res: Response, next: NextFunction): void {
  const articleValidationResponse = getArticleValidationResponse(req.body, []);
  if (!articleValidationResponse) {
    next();
  } else {
    res.status(HttpCode.BAD_REQUEST).send(articleValidationResponse);
  }
}

function getArticleValidationResponse(
  article: Partial<Article>,
  skipFields: (keyof Article)[] = [],
): ArticleValidationResponse {
  const validationResponse: ArticleValidationResponse = {};

  if (!article.id && !skipFields.includes(`id`)) {
    validationResponse.id = {state: ValidationError.REQUIRED};
  }
  if (!article.title) {
    validationResponse.title = {
      state: ValidationError.REQUIRED,
      message: `Текст длиной от ${TITLE_RESTRICTIONS[0]} до ${TITLE_RESTRICTIONS[1]} символов`,
    };
  } else if (article.title.length < TITLE_RESTRICTIONS[0] || article.title.length > TITLE_RESTRICTIONS[1]) {
    validationResponse.title = {
      state: ValidationError.INVALID,
      message: `Текст длиной от ${TITLE_RESTRICTIONS[0]} до ${TITLE_RESTRICTIONS[1]} символов`,
    };
  }
  if (!article.createdDate) {
    validationResponse.createdDate = {state: ValidationError.REQUIRED};
  }
  if (article.category || !article.category.length) {
    validationResponse.category = {state: ValidationError.REQUIRED};
  }
  if (!article.announce) {
    validationResponse.announce = {
      state: ValidationError.REQUIRED,
      message: `Текст длиной от ${ANNOUNCE_RESTRICTIONS[0]} до ${ANNOUNCE_RESTRICTIONS[1]} символов`,
    };
  } else if (article.announce.length < ANNOUNCE_RESTRICTIONS[0] || article.announce.length > ANNOUNCE_RESTRICTIONS[1]) {
    validationResponse.announce = {
      state: ValidationError.INVALID,
      message: `Текст длиной от ${ANNOUNCE_RESTRICTIONS[0]} до ${ANNOUNCE_RESTRICTIONS[1]} символов`,
    };
  }
  if (article.fullText && article.fullText.length > MAX_FULLTEXT_LENGTH) {
    validationResponse.fullText = {
      state: ValidationError.INVALID,
      message: `Максимальная длина ${MAX_FULLTEXT_LENGTH} символов`,
    };
  }

  if (Object.keys(validationResponse).length) {
    return validationResponse;
  }
  return null;
}
