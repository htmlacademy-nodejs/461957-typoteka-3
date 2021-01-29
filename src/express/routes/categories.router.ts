import {NextFunction, Request, Response, Router} from "express";
import {streamPage} from "../utils/stream-page";
import {CategoriesPage} from "../views/pages/CategoriesPage";
import {dataProviderService} from "../services";
import {HttpCode} from "../../constants-es6";
import {SSRError} from "../errors/ssr-error";
import {CategoryEditableProps} from "../views/components/CategoryEditable/CategoryEditable";

export const categoriesRouter = Router();

categoriesRouter.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await dataProviderService.getCategories();
    const editableCategories: CategoryEditableProps[] = categories.map(category => ({
      label: category.label,
      endPoint: category.id.toString(10),
      id: category.id,
    }));
    return streamPage(res, CategoriesPage, {newCategoryEndPoint: `#`, categories: editableCategories});
  } catch (e) {
    return next(
      new SSRError({
        message: `Failed to get categories`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e as Error,
      }),
    );
  }
});
