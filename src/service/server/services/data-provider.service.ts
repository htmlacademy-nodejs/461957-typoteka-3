import {Article} from "../../../types/article";
import {promises} from "fs";
import {MockFilePath} from "../../../constants-es6";
import {ArticleComment} from "../../../types/article-comment";
import {Category} from "../../../types/category";

export class DataProviderService {
  public articlesCash: Article[];
  public categoriesCash: Category[];

  public async getCategories(): Promise<Category[] | null> {
    if (!this.categoriesCash) {
      try {
        this.categoriesCash = JSON.parse(await promises.readFile(MockFilePath.CATEGORIES, `utf-8`)) as Category[];
      } catch (e) {
        console.error(`Failed to get categories`);
        this.categoriesCash = null;
      }
    }
    return this.categoriesCash;
  }

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

  public async searchByArticlesTitle(query: string): Promise<Article[] | null> {
    const articles = await this.getArticles();
    if (articles === null) {
      return null;
    }
    return articles.filter(article => article.title.includes(query));
  }

  public async getArticleById(id: string): Promise<Article | null> {
    const articles = await this.getArticles();
    if (articles === null) {
      return null;
    }
    return articles.find(article => article.id === id) ?? null;
  }

  public async getArticlesByCategory(categoryId: string): Promise<Article[]> {
    const articles = await this.getArticles();
    if (articles === null) {
      return [];
    }
    return articles.filter(article => article.category.includes(categoryId));
  }

  public async getCommentsByArticleId(id: string): Promise<ArticleComment[] | null> {
    const article = await this.getArticleById(id);
    if (article === null) {
      return null;
    }
    return article.comments;
  }

  public async deleteCommentById(articleId: string, commentId: string): Promise<ArticleComment | null> {
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

  public async getArticleCommentById(articleId: string, commentId: string): Promise<ArticleComment | null> {
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

  public async updateArticle(id: string, article: Article): Promise<Article | null> {
    const existingArticle = await this.getArticleById(id);
    if (existingArticle === null) {
      return null;
    }
    return Object.assign(existingArticle, article);
  }

  public async deleteArticle(id: string): Promise<Article | null> {
    const existingArticle = await this.getArticleById(id);
    if (existingArticle === null) {
      return null;
    }
    this.articlesCash = this.articlesCash.filter(article => article.id !== id);
    return existingArticle;
  }

  public async createComment(articleId: string, newComment: ArticleComment): Promise<ArticleComment | null> {
    const existingArticle = await this.getArticleById(articleId);
    if (existingArticle === null) {
      return null;
    }
    existingArticle.comments.push(newComment);
    return newComment;
  }
}
