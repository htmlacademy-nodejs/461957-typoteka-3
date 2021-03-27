import {NextFunction, Request, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {CategoriesPage} from "../views/pages/CategoriesPage";
import {dataProviderService} from "../services";
import {HttpCode} from "../../constants-es6";
import {SSRError} from "../errors/ssr-error";
import {CategoryEditableProps} from "../views/components/CategoryEditable/CategoryEditable";
import {IResponseExtended} from "../../types/interfaces/response-extended";
import {isAuthorUserMiddleware} from "../middlewares";

export const categoriesRouter = Router();

categoriesRouter.get(
  `/`,
  [isAuthorUserMiddleware],
  async (req: Request, res: IResponseExtended, next: NextFunction) => {
    try {
      const categories = await dataProviderService.getCategories();
      const editableCategories: CategoryEditableProps[] = categories.map(category => ({
        label: category.label,
        endPoint: category.id.toString(10),
        id: category.id,
      }));
      return streamPage(res, CategoriesPage, {
        newCategoryEndPoint: `#`,
        categories: editableCategories,
        currentUser: res.locals.currentUser,
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
