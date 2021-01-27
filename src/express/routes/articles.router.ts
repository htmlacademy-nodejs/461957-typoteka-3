import {NextFunction, Request, Response, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {SSRError} from "../errors/ssr-error";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {ArticlePage} from "../views/pages/ArticlePage";
import multer from "multer";
import type {ArticleValidationResponse} from "../../types/article-validation-response";
import {EditArticlePage} from "../views/pages/EditArticlePage";
import {convertCategoriesToArray} from "../utils/convert-categories-to-array";
import {ArticlesByCategoryPage} from "../views/pages/ArticlesByCategoryPage";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {CategoryWithLinksAndNumbers} from "../../types/category-with-links-and-numbers";
import type {ArticleFromBrowser} from "../../types/article-from-browser";
import {NewArticle} from "../../types/article";
import {getCurrentPage, getOffsetFromPage, getPageFromReqQuery} from "../helpers/page-resolver";
import {getArticleLink} from "../helpers/link-resolver";
import {filterSelectedCategories} from "../utils/filter-selected-categories";

const multerMiddleware = multer();
export const articlesRouter = Router();

articlesRouter.get(`/add`, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await dataProviderService.getCategories();
    if (categories === null) {
      return next(
        new SSRError({
          message: `Failed to request categories`,
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        }),
      );
    }
    return streamPage(res, EditArticlePage, {endPoint: ClientRoutes.ARTICLES.ADD, availableCategories: categories});
  } catch (e) {
    console.log(e);
    return next(
      new SSRError({
        message: `Failed to create an article`,
        statusCode: HttpCode.BAD_REQUEST,
        errorPayload: e as Error,
      }),
    );
  }
});

articlesRouter.post(`/add`, [multerMiddleware.none()], async (req: Request, res: Response, next: NextFunction) => {
  const newArticle: NewArticle = {
    ...(req.body as ArticleFromBrowser),
    categories: convertCategoriesToArray((req.body as ArticleFromBrowser)?.categories),
  };
  try {
    const response: true | ArticleValidationResponse = await dataProviderService.createArticle(newArticle);
    if (response === true) {
      return res.redirect(ClientRoutes.ADMIN.INDEX);
    } else {
      const categories = await dataProviderService.getCategories();
      if (categories === null) {
        return next(
          new SSRError({
            message: `Failed to create an article`,
            statusCode: HttpCode.BAD_REQUEST,
          }),
        );
      }
      return streamPage(res, EditArticlePage, {
        article: newArticle,
        endPoint: ClientRoutes.ARTICLES.ADD,
        articleValidationResponse: response,
        availableCategories: categories,
      });
    }
  } catch (e) {
    console.log(e);
    return next(
      new SSRError({
        message: `Failed to create an article`,
        statusCode: HttpCode.BAD_REQUEST,
        errorPayload: e as Error,
      }),
    );
  }
});

articlesRouter.get(`/category/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const page = getPageFromReqQuery(req);
  const offset = getOffsetFromPage(page);
  const categoryId = parseInt(req.params.id, 10);
  try {
    const [{items: articles, totalCount, category}, categories] = await Promise.all([
      dataProviderService.getArticlesByCategoryId({offset, categoryId}),
      dataProviderService.getCategoriesWithNumbers(),
    ]);
    const preparedCategories: CategoryWithLinksAndNumbers[] = resolveLinksToCategoriesWithNumbers(categories);
    if (articles === null) {
      return next(
        new SSRError({
          message: `Failed to get articles by category id or failed to get categories`,
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        }),
      );
    }
    return streamPage(res, ArticlesByCategoryPage, {
      pageTitle: category.label,
      categories: preparedCategories,
      articles: articles.map(item => ({...item, link: getArticleLink(item.id)})),
      selectedCategoryId: category.id,
      total: totalCount,
      page: getCurrentPage(offset),
      prefix: `${ClientRoutes.ARTICLES.CATEGORY}/${category.id}?`,
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

articlesRouter.get(`/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const articleId = parseInt(req.params.id, 10);
  try {
    const [article, categories] = await Promise.all([
      dataProviderService.getArticleById(articleId),
      dataProviderService.getCategoriesWithNumbers(),
    ]);
    if (article === null) {
      return next(new SSRError({message: `Failed to get article`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
    const categoriesWithLinksAndNumbers: CategoryWithLinksAndNumbers[] = resolveLinksToCategoriesWithNumbers(
      categories,
    );
    return streamPage(res, ArticlePage, {
      categories: filterSelectedCategories(categoriesWithLinksAndNumbers, article.categories),
      createdDate: article.createdDate,
      title: article.title,
      previousPageUrl: req.header(`referer`),
      fullText: article.fullText,
    });
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to get article`,
        statusCode: HttpCode.NOT_FOUND,
        errorPayload: e as Error,
      }),
    );
  }
});

articlesRouter.get(`/edit/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const articleId = parseInt(req.params.id, 10);
  try {
    const [article, categories] = await Promise.all([
      dataProviderService.getArticleById(articleId),
      dataProviderService.getCategories(),
    ]);
    if (article === null && categories === null) {
      return next(
        new SSRError({message: `Failed to get article or categories`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}),
      );
    }
    return streamPage(res, EditArticlePage, {
      article,
      endPoint: `${ClientRoutes.ARTICLES.INDEX}/${articleId}`,
      availableCategories: categories,
    });
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to get article`,
        statusCode: HttpCode.NOT_FOUND,
        errorPayload: e as Error,
      }),
    );
  }
});
