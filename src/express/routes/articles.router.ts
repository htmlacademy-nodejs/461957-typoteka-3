import {NextFunction, Request, Response, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {SSRError} from "../errors/ssr-error";
import {ClientRoutes, HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services";
import {ArticlePage} from "../views/pages/ArticlePage";
import multer from "multer";
import type {ArticleValidationResponse} from "../../types/article-validation-response";
import {EditArticle} from "../views/components/EditArticle/EditArticle";
import {convertCategoriesToArray} from "../utils/convert-categories-to-array";
import {ArticlesByCategoryPage} from "../views/pages/ArticlesByCategoryPage";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {CategoryWithLinksAndNumbers} from "../../types/category-with-links-and-numbers";
import type {ArticleFromBrowser} from "../../types/article-from-browser";
import {NewArticle} from "../../types/article";

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
    return streamPage(res, EditArticle, {endPoint: ClientRoutes.ARTICLES.ADD, availableCategories: categories});
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
  const newArticle = {...req.body, category: convertCategoriesToArray((req.body as ArticleFromBrowser)?.category)} as NewArticle;
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
      return streamPage(res, EditArticle, {
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
  const categoryId = Number(req.params.id);
  try {
    const [{articles, category}, categories] = await Promise.all([
      dataProviderService.getArticlesByCategoryId(categoryId),
      dataProviderService.getCategories(),
    ]);
    const preparedCategories: CategoryWithLinksAndNumbers[] = resolveLinksToCategoriesWithNumbers(categories);
    if (articles === null) {
      return next(new SSRError({message: `Failed to get article`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
    return streamPage(res, ArticlesByCategoryPage, {
      pageTitle: category.label,
      categories: preparedCategories,
      articles,
      selectedCategoryId: Number(category.id),
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

articlesRouter.get(`/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const articleId = req.params.id;
  try {
    const article = await dataProviderService.getArticleById(articleId);
    if (article === null) {
      return next(new SSRError({message: `Failed to get article`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
    return streamPage(res, ArticlePage, {article});
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
  const articleId = req.params.id;
  try {
    const [article, categories] = await Promise.all([
      dataProviderService.getArticleById(articleId),
      dataProviderService.getCategories(),
    ]);
    if (article === null && categories === null) {
      return next(new SSRError({message: `Failed to get article or categories`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
    return streamPage(res, EditArticle, {
      article,
      endPoint: ClientRoutes.ARTICLES.INDEX + `/` + articleId,
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
