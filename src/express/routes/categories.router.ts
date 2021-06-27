import csrf from "csurf";
import {NextFunction, Request, Router} from "express";

import {HttpCode} from "../../constants";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {SSRError} from "../errors/ssr-error";
import {isAuthorUserMiddleware} from "../middlewares";
import {dataProviderService} from "../services";
import {streamPage} from "../utils/stream-page";
import {CategoryEditableProps} from "../views/components/CategoryEditable/CategoryEditable";
import {CategoriesPage} from "../views/pages/CategoriesPage";

const csrfProtection = csrf({cookie: true});
export const categoriesRouter = Router();

categoriesRouter.get(
  `/`,
  [isAuthorUserMiddleware, csrfProtection],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    try {
      const categories = await dataProviderService.getCategories();
      const editableCategories: CategoryEditableProps[] = categories.map(category => ({
        label: category.label,
        endPoint: category.id.toString(10),
        id: category.id,
        csrf: req.csrfToken(),
      }));
      return streamPage(res, CategoriesPage, {
        newCategoryEndPoint: `#`,
        categories: editableCategories,
        currentUser: res.locals.currentUser,
        csrf: req.csrfToken(),
      });
    } catch (e) {
      return next(
        new SSRError({
          message: `Failed to get categories`,
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          errorPayload: e as Error,
        }),
      );
    }
  },
);
