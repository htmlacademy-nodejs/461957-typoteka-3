import {NextFunction, Request, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {SSRError} from "../errors/ssr-error";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import multer from "multer";
import type {ArticleValidationResponse} from "../../types/article-validation-response";
import {EditArticlePage} from "../views/pages/EditArticlePage";
import {convertCategoriesToArray} from "../utils/convert-categories-to-array";
import {ArticlesByCategoryPage} from "../views/pages/ArticlesByCategoryPage";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {CategoryWithLinksAndNumbers} from "../../types/category-with-links-and-numbers";
import type {ArticleFromBrowser} from "../../types/article-from-browser";
import {getCurrentPage, getOffsetFromPage, getPageFromReqQuery} from "../helpers/page-resolver";
import {getArticleLink} from "../helpers/link-resolver";
import {IArticleCreating} from "../../types/interfaces/article-creating";
import {prepareArticlePage} from "../helpers/prepare-article-page";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {getAccessTokenFromCookies} from "../helpers/cookie.helper";

const multerMiddleware = multer();
export const articlesRouter = Router();

articlesRouter.get(`/add`, async (req: Request, res: IResponseExtended, next: NextFunction) => {
  try {
    const categories = await dataProviderService.getCategories();
    return streamPage(res, EditArticlePage, {
      endPoint: ClientRoutes.ARTICLES.ADD,
      availableCategories: categories,
      currentUser: res.locals.currentUser,
    });
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to get categories`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
      }),
    );
  }
});

articlesRouter.post(
  `/add`,
  [multerMiddleware.none()],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    const newArticle: IArticleCreating = {
      ...(req.body as ArticleFromBrowser),
      categories: convertCategoriesToArray((req.body as ArticleFromBrowser)?.categories),
    };
    try {
      const articleValidationResponse: ArticleValidationResponse | void = await dataProviderService.createArticle(
        newArticle,
        getAccessTokenFromCookies(req),
      );
      if (!articleValidationResponse) {
        return res.redirect(ClientRoutes.ADMIN.INDEX);
      }
      try {
        const categories = await dataProviderService.getCategories();
        return streamPage(res, EditArticlePage, {
          article: {...newArticle, createdDate: parseDateFromFrontend(newArticle.createdDate)},
          endPoint: ClientRoutes.ARTICLES.ADD,
          articleValidationResponse,
          availableCategories: categories,
          currentUser: res.locals.currentUser,
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
  [multerMiddleware.none()],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    const articleId = parseInt(req.params.id, 10);
    const updatingArticle: IArticleCreating = {
      ...(req.body as ArticleFromBrowser),
      categories: convertCategoriesToArray((req.body as ArticleFromBrowser)?.categories),
      createdDate: parseDateFromFrontend((req.body as ArticleFromBrowser).createdDate as unknown),
    };
    try {
      const articleValidationResponse: ArticleValidationResponse | void = await dataProviderService.updateArticle(
        articleId,
        updatingArticle,
        getAccessTokenFromCookies(req),
      );
      if (!articleValidationResponse) {
        return res.redirect(ClientRoutes.ADMIN.INDEX);
      }
      try {
        const categories = await dataProviderService.getCategories();
        return streamPage(res, EditArticlePage, {
          article: updatingArticle,
          endPoint: `${ClientRoutes.ARTICLES.EDIT}/${articleId}`,
          articleValidationResponse,
          availableCategories: categories,
          isUpdating: true,
          currentUser: res.locals.currentUser,
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
      prefix: `${ClientRoutes.ARTICLES.CATEGORY}/${category.id}?`,
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

articlesRouter.get(`/:id`, async (req: Request, res: IResponseExtended, next: NextFunction) => {
  const articleId = parseInt(req.params.id, 10);
  try {
    const {page: articlePage, props} = await prepareArticlePage({articleId, currentUser: res.locals.currentUser});
    return streamPage(res, articlePage, {...props, previousPageUrl: req.header(`referer`)});
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to get article`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});

articlesRouter.get(`/edit/:id`, async (req: Request, res: IResponseExtended, next: NextFunction) => {
  const articleId = parseInt(req.params.id, 10);
  try {
    const [article, categories] = await Promise.all([
      dataProviderService.getArticleById(articleId),
      dataProviderService.getCategories(),
    ]);
    return streamPage(res, EditArticlePage, {
      article,
      endPoint: `${ClientRoutes.ARTICLES.EDIT}/${articleId}`,
      availableCategories: categories,
      isUpdating: true,
      currentUser: res.locals.currentUser,
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
});

function parseDateFromFrontend(date: unknown): Date {
  return new Date(Date.parse(date as string));
}
