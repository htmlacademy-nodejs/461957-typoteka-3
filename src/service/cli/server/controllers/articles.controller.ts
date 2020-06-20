import {DataProviderService} from "../services/data-provider.service";
import {Request, Response} from "express";
import {HttpCode} from "../../../../constants-es6";
import {ArticleComment} from "../../../../types/article-comment";
import {Article} from "../../../../types/article";
import {ControllerResponse} from "../../../../types/controller-response";

export class ArticlesController {
  constructor(private dataProvider: DataProviderService) {}

  public async getArticles(): Promise<ControllerResponse<Article[]>> {
    const articles = await this.dataProvider.getArticles();
    if (articles === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {payload: articles};
  }

  public async getArticleById(id: string): Promise<ControllerResponse<Article>> {
    const article = await this.dataProvider.getArticleById(id);
    if (article === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {payload: article};
  }

  public async getCommentsByArticleId(id: string): Promise<ControllerResponse<ArticleComment[]>> {
    const articleComments = await this.dataProvider.getCommentsByArticleId(id);
    if (articleComments === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {payload: articleComments};
  }

  public async getArticleCommentById(articleId: string, commentId: string): Promise<ControllerResponse<ArticleComment>> {
    const comment = await this.dataProvider.getArticleCommentById(articleId, commentId);
    if (comment === null) {
      return {status: HttpCode.NOT_FOUND}
    }
    return {payload: comment}
  }
}
