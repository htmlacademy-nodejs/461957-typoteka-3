import {Router} from "express";
import {streamPage} from "../utils/stream-page";
import {CategoriesPage} from "../views/pages/CategoriesPage";
import {dataProviderService} from "../services";
import {HttpCode} from "../../constants-es6";
import {SSRError} from "../errors/ssr-error";
import {CategoryEditableProps} from "../views/components/CategoryEditable/CategoryEditable";

export const categoriesRouter = Router();

categoriesRouter.get(`/`, async (req, res, next) => {
  const categories = await dataProviderService.getCategories();
  if (categories !== null) {
    const editableCategories: CategoryEditableProps[] = categories.map(category => ({
      label: category.label,
      endPoint: category.id,
      id: category.id,
    }));
    streamPage(res, CategoriesPage, {newCategoryEndPoint: `#`, categories: editableCategories});
  } else {
    next(
      new SSRError({
        message: `Failed to request categories`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
      }),
    );
  }
});
