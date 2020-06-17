import {DataProviderService} from "../services/data-provider.service";
import {Request, Response} from "express";
import {HttpCode} from "../../../../constants-es6";
import {ArticleComment} from "../../../../types/article-comment";
import {Article} from "../../../../types/article";

export class ArticlesController {
  constructor(private dataProvider: DataProviderService) {}

  public async getArticles(req: Request, res: Response): Promise<void> {
    const articles = await this.dataProvider.getArticles();
    if (articles === null) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send();
      return;
    }
    res.send(articles as Article[]);
  }

  public async getArticleById(req: Request, res: Response, id: string): Promise<void> {
    const article = await this.dataProvider.getArticleById(id);
    if (article === null) {
      res.status(HttpCode.NOT_FOUND).send();
      return;
    }
    res.send(article as Article);
  }

  public async getCommentsByArticleId(req: Request, res: Response, id: string): Promise<void> {
    const articleComments = await this.dataProvider.getCommentsByArticleId(id);
    if (articleComments === null) {
      res.status(HttpCode.NOT_FOUND).send();
      return;
    }
    res.send(articleComments as ArticleComment[]);
  }

  public async getArticleCommentById(req: Request, res: Response, articleId: string, commentId: string): Promise<void> {
    const comment = await this.dataProvider.getArticleCommentById(articleId, commentId);
    if (comment === null) {
      res.status(HttpCode.NOT_FOUND).send();
      return;
    }
    res.send(comment as ArticleComment);
  }
}
