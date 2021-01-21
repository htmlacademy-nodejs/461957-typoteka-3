import {Article} from "../../../types/article";
import {promises} from "fs";
import {MockFilePath} from "../../../constants-es6";
import {ArticleComment, CommentId} from "../../../types/article-comment";
import {ArticleId} from "../../../types/article-id";

export class DataProviderService {
  public articlesCash: Article[];

  public async getArticles(count?: number): Promise<Article[] | null> {
    if (!this.articlesCash) {
      try {
        this.articlesCash = JSON.parse(await promises.readFile(MockFilePath.ARTICLES, `utf-8`)) as Article[];
      } catch (e) {
        console.error(`Failed to get articles`);
        this.articlesCash = null;
      }
    }
    return this.articlesCash?.slice(0, count);
  }

  public async getArticleById(id: ArticleId): Promise<Article | null> {
    const articles = await this.getArticles();
    if (articles === null) {
      return null;
    }
    return articles.find(article => article.id === id) ?? null;
  }

  public async getCommentsByArticleId(id: ArticleId): Promise<ArticleComment[] | null> {
    const article = await this.getArticleById(id);
    if (article === null) {
      return null;
    }
    return article.comments;
  }

  public async deleteCommentById(articleId: ArticleId, commentId: CommentId): Promise<ArticleComment | null> {
    const article = await this.getArticleById(articleId);
    if (article === null) {
      return null;
    }
    const commentToDelete = article.comments.find(comment => comment.id === commentId);
    if (!commentToDelete) {
      return null;
    }
    article.comments = article.comments.filter(comment => comment.id !== commentId);
    return commentToDelete;
  }

  public async getArticleCommentById(articleId: ArticleId, commentId: CommentId): Promise<ArticleComment | null> {
    const comments = await this.getCommentsByArticleId(articleId);
    if (comments === null) {
      return null;
    }
    return comments.find(comment => comment.id === commentId) ?? null;
  }

  public async createNewArticle(article: Article): Promise<Article | null> {
    if (!this.articlesCash) {
      await this.getArticles();
    }
    this.articlesCash.push(article);
    return article;
  }

  public async updateArticle(id: ArticleId, article: Article): Promise<Article | null> {
    const existingArticle = await this.getArticleById(id);
    if (existingArticle === null) {
      return null;
    }
    return Object.assign(existingArticle, article);
  }

  public async deleteArticle(id: ArticleId): Promise<Article | null> {
    const existingArticle = await this.getArticleById(id);
    if (existingArticle === null) {
      return null;
    }
    this.articlesCash = this.articlesCash.filter(article => article.id !== id);
    return existingArticle;
  }

  public async createComment(articleId: ArticleId, newComment: ArticleComment): Promise<ArticleComment | null> {
    const existingArticle = await this.getArticleById(articleId);
    if (existingArticle === null) {
      return null;
    }
    existingArticle.comments.push(newComment);
    return newComment;
  }
}
