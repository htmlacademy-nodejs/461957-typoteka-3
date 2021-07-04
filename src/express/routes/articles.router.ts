import csrf from "csurf";
import {NextFunction, Request, Router} from "express";
import multer from "multer";

import {HttpCode} from "../../constants";
import {ClientRoute} from "../../shared/constants/routes/client-route";
import type {ArticleFromBrowser} from "../../types/article-from-browser";
import type {ArticleValidationResponse} from "../../types/article-validation-response";
import {CategoryWithLinksAndNumbers} from "../../types/category-with-links-and-numbers";
import {IArticleCreating} from "../../types/interfaces/article-creating";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {SSRError} from "../errors/ssr-error";
import {getAccessTokenFromCookies} from "../helpers/cookie.helper";
import {getArticleLink} from "../helpers/link-resolver";
import {getCurrentPage, getOffsetFromPage, getPageFromReqQuery} from "../helpers/page-resolver";
import {prepareArticlePage} from "../helpers/prepare-article-page";
import {getLogger} from "../logger";
import {isAuthorUserMiddleware} from "../middlewares";
import {articleValidationResponseMapper} from "../models/dto";
import {dataProviderService} from "../services";
import {convertCategoriesToArray} from "../utils/convert-categories-to-array";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {streamPage} from "../utils/stream-page";
import {ArticlesByCategoryPage} from "../views/pages/ArticlesByCategoryPage";
import {EditArticlePage} from "../views/pages/EditArticlePage";

const csrfProtection = csrf({cookie: true});
const multerMiddleware = multer();
const articlesRouter = Router();
const logger = getLogger();

articlesRouter.get(
  `/add`,
  [isAuthorUserMiddleware, csrfProtection],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    try {
      const categories = await dataProviderService.getCategories();
      return streamPage(res, EditArticlePage, {
        endPoint: ClientRoute.ARTICLES.ADD,
        availableCategories: categories,
        currentUser: res.locals.currentUser,
        csrf: req.csrfToken(),
        articleValidationResponse: {},
      });
    } catch (e) {
      return next(
        new SSRError({
          message: `Failed to get categories`,
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        }),
      );
    }
  },
);

articlesRouter.post(
  `/add`,
  [isAuthorUserMiddleware, multerMiddleware.none(), csrfProtection],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    const newArticle: IArticleCreating = {
      title: (req.body as ArticleFromBrowser).title,
      announce: (req.body as ArticleFromBrowser).announce,
      fullText: (req.body as ArticleFromBrowser).fullText,
      createdDate: (req.body as ArticleFromBrowser).createdDate,
      categories: convertCategoriesToArray((req.body as ArticleFromBrowser)?.categories),
      authorId: res.locals.currentUser.id,
    };
    try {
      const articleValidationResponse: ArticleValidationResponse | void = await dataProviderService.createArticle(
        newArticle,
        getAccessTokenFromCookies(req),
      );
      if (!articleValidationResponse) {
        return res.redirect(ClientRoute.ADMIN.INDEX);
      }
      try {
        const categories = await dataProviderService.getCategories();
        return streamPage(res, EditArticlePage, {
          article: {...newArticle, createdDate: parseDateFromFrontend(newArticle.createdDate)},
          endPoint: ClientRoute.ARTICLES.ADD,
          articleValidationResponse: articleValidationResponseMapper(articleValidationResponse),
          availableCategories: categories,
          currentUser: res.locals.currentUser,
          csrf: req.csrfToken(),
        });
      } catch (e) {
        return next(
          new SSRError({
            message: `Failed to load categories`,
            statusCode: HttpCode.BAD_REQUEST,
          }),
        );
      }
    } catch (e) {
      return next(
        new SSRError({
          message: `Failed to create an article`,
          statusCode: HttpCode.BAD_REQUEST,
          errorPayload: e as Error,
        }),
      );
    }
  },
);

articlesRouter.post(
  `/edit/:id`,
  [isAuthorUserMiddleware, multerMiddleware.none(), csrfProtection],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    const articleId = parseInt(req.params.id, 10);
    const updatingArticle: IArticleCreating = {
      title: (req.body as ArticleFromBrowser).title,
      announce: (req.body as ArticleFromBrowser).announce,
      fullText: (req.body as ArticleFromBrowser).fullText,
      categories: convertCategoriesToArray((req.body as ArticleFromBrowser)?.categories),
      createdDate: parseDateFromFrontend((req.body as ArticleFromBrowser).createdDate as unknown),
      authorId: res.locals.currentUser.id,
    };
    try {
      const articleValidationResponse: ArticleValidationResponse | void = await dataProviderService.updateArticle(
        articleId,
        updatingArticle,
        getAccessTokenFromCookies(req),
      );
      if (!articleValidationResponse) {
        return res.redirect(ClientRoute.ADMIN.INDEX);
      }
      try {
        const categories = await dataProviderService.getCategories();
        return streamPage(res, EditArticlePage, {
          article: updatingArticle,
          endPoint: `${ClientRoute.ARTICLES.EDIT}/${articleId}`,
          articleValidationResponse: articleValidationResponseMapper(articleValidationResponse),
          availableCategories: categories,
          isUpdating: true,
          currentUser: res.locals.currentUser,
          csrf: req.csrfToken(),
        });
      } catch (e) {
        return next(
          new SSRError({
            message: `Failed to load categories`,
            statusCode: HttpCode.BAD_REQUEST,
          }),
        );
      }
    } catch (e) {
      return next(
        new SSRError({
          message: `Failed to update the article #${articleId}`,
          statusCode: HttpCode.BAD_REQUEST,
          errorPayload: e as Error,
        }),
      );
    }
  },
);

articlesRouter.get(`/category/:id`, async (req: Request, res: IResponseExtended, next: NextFunction) => {
  const page = getPageFromReqQuery(req);
  const offset = getOffsetFromPage(page);
  const categoryId = parseInt(req.params.id, 10);
  try {
    const [{items: articles, totalCount, category}, categories] = await Promise.all([
      dataProviderService.getArticlesByCategoryId({offset, categoryId}),
      dataProviderService.getCategoriesWithNumbers(),
    ]);
    const preparedCategories: CategoryWithLinksAndNumbers[] = resolveLinksToCategoriesWithNumbers(categories);
    return streamPage(res, ArticlesByCategoryPage, {
      pageTitle: category.label,
      categories: preparedCategories,
      articles: articles.map(item => ({...item, link: getArticleLink(item.id)})),
      selectedCategoryId: category.id,
      total: totalCount,
      page: getCurrentPage(offset),
      prefix: `${ClientRoute.ARTICLES.CATEGORY}/${category.id}?`,
      currentUser: res.locals.currentUser,
    });
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to get articles by category id or by get categories`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});

articlesRouter.get(`/:id`, [csrfProtection], async (req: Request, res: IResponseExtended, next: NextFunction) => {
  const articleId = parseInt(req.params.id, 10);
  try {
    const {page: articlePage, props} = await prepareArticlePage({
      articleId,
      currentUser: res.locals.currentUser,
      csrf: req.csrfToken(),
    });
    return streamPage(res, articlePage, {...props, previousPageUrl: req.header(`referer`)});
  } catch (e) {
    logger.error(e);
    return next(
      new SSRError({
        message: `Failed to get article`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});

articlesRouter.get(
  `/edit/:id`,
  [isAuthorUserMiddleware, csrfProtection],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    const articleId = parseInt(req.params.id, 10);
    try {
      const [article, categories] = await Promise.all([
        dataProviderService.getArticleById(articleId),
        dataProviderService.getCategories(),
      ]);
      return streamPage(res, EditArticlePage, {
        article,
        endPoint: `${ClientRoute.ARTICLES.EDIT}/${articleId}`,
        availableCategories: categories,
        isUpdating: true,
        currentUser: res.locals.currentUser,
        csrf: req.csrfToken(),
        articleValidationResponse: {},
      });
    } catch (e) {
      return next(
        new SSRError({
          message: `Failed to get article or categories`,
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          errorPayload: e as Error,
        }),
      );
    }
  },
);

function parseDateFromFrontend(date: unknown): Date {
  return new Date(Date.parse(date as string));
}

export {articlesRouter};
