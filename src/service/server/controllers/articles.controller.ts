import {DataProviderService} from "../services/data-provider.service";
import {HttpCode} from "../../../constants-es6";
import {ArticleComment} from "../../../types/article-comment";
import {Article} from "../../../types/article";
import {ControllerResponse} from "../../../types/controller-response";
import {nanoid} from "nanoid";
import {NewArticle} from "../../../types/new-article";

export class ArticlesController {
  constructor(private dataProvider: DataProviderService) {}

  public async getArticles(count?: number): Promise<ControllerResponse<Article[]>> {
    const articles = await this.dataProvider.getArticles(count);
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

  public async getArticlesByCategory(categoryId: string): Promise<ControllerResponse<Article[]>> {
    const articles = await this.dataProvider.getArticlesByCategory(categoryId);
    if (articles === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {payload: articles};
  }

  public async getCommentsByArticleId(id: string): Promise<ControllerResponse<ArticleComment[]>> {
    const articleComments = await this.dataProvider.getCommentsByArticleId(id);
    if (articleComments === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {payload: articleComments};
  }

  public async deleteCommentById(articleId: string, commentId: string): Promise<ControllerResponse<ArticleComment>> {
    const articleComments = await this.dataProvider.deleteCommentById(articleId, commentId);
    if (articleComments === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {status: HttpCode.OK};
  }

  public async getArticleCommentById(
    articleId: string,
    commentId: string,
  ): Promise<ControllerResponse<ArticleComment>> {
    const comment = await this.dataProvider.getArticleCommentById(articleId, commentId);
    if (comment === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {payload: comment};
  }

  public async createNewArticle(newArticle: NewArticle): Promise<ControllerResponse<Article>> {
    const article: Article = {...newArticle, id: nanoid(), comments: []};
    const savedArticle = await this.dataProvider.createNewArticle(article);
    if (savedArticle === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {status: HttpCode.CREATED, payload: savedArticle};
  }

  public async updateArticle(id: string, article: Article): Promise<ControllerResponse<Article>> {
    const updatedArticle = await this.dataProvider.updateArticle(id, article);
    if (updatedArticle === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {payload: updatedArticle};
  }

  public async deleteArticle(id: string): Promise<ControllerResponse<Article>> {
    const deletedArticle = await this.dataProvider.deleteArticle(id);
    if (deletedArticle === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {status: HttpCode.OK};
  }

  public async createComment(articleId: string, commentText: string): Promise<ControllerResponse<ArticleComment>> {
    const newComment: ArticleComment = {id: nanoid(), text: commentText};
    const savedComment = await this.dataProvider.createComment(articleId, newComment);
    if (savedComment === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {status: HttpCode.CREATED, payload: savedComment};
  }
}
