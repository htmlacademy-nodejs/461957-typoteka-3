import {Router} from "express";
import {HttpCode} from "../../constants-es6";
import {dataProviderService} from "../services/data-provider.service";
import {streamPage} from "../utils/stream-page";
import {AdminPublicationsPage} from "../views/pages/AdminPublicationsPage";
import {AdminCommentsPage} from "../views/pages/AdminCommentsPage";
import {SSRError} from "../errors/ssr-error";

export const adminPublicationsRouter = Router();

adminPublicationsRouter.get(`/`, async (req, res, next) => {
  try {
    const articles = await dataProviderService.getArticles();
    if (articles !== null) {
      streamPage(res, AdminPublicationsPage, {articles});
    } else {
      next(new SSRError({message: `Failed to get Admin articles`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
  } catch (e) {
    next(
      new SSRError({
        message: `Failed to get Admin articles`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e,
      }),
    );
  }
});

adminPublicationsRouter.get(`/comments`, async (req, res, next) => {
  try {
    const listOfComments = await dataProviderService.getComments(3);
    if (listOfComments !== null) {
      streamPage(res, AdminCommentsPage, {listOfComments});
    } else {
      next(new SSRError({message: `Failed to get Admin comments`, statusCode: HttpCode.INTERNAL_SERVER_ERROR}));
    }
  } catch (e) {
    next(
      new SSRError({
        message: `Failed to get Admin comments`,
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        errorPayload: e,
      }),
    );
  }
});